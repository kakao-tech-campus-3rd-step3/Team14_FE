vi.mock('@/apis/festivals/getFestivals', async () => {
  const { festivalsMockData } = await import('@/mocks/data/festivals.mock');
  return {
    __esModule: true,
    default: vi.fn().mockResolvedValue({ data: festivalsMockData }),
  };
});

vi.mock('@/apis/festivals/postFestivalsPick', async () => {
  const { festivalsPickMockData } = await import('@/mocks/data/festivalsPick.mock');
  return {
    __esModule: true,
    default: vi.fn().mockResolvedValue({
      data: { content: festivalsPickMockData },
    }),
  };
});

import { render, screen, waitFor, within } from '@testing-library/react';
import FestivalsPage from '@/pages/Festivals/FestivalsPage';
import { festivalsMockData } from '@/mocks/data/festivals.mock';
import { festivalsPickMockData } from '@/mocks/data/festivalsPick.mock';
import TestWrapper from '@/__tests__/TestWrapper';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { type PostFestivalsPickBody } from '@/apis/festivals/postFestivalsPick';
import { type PickStyleId } from '@/constants/pickStyles';

const initialEntries = [API_ENDPOINTS.FESTIVALS.replace(':areaId', '2')];

// AI 추천 테스트를 위한 mock request data
const mockRequestData = {
  areaCode: 2,
  styles: ['TRADITIONAL', 'FOOD'] as PickStyleId[],
  isNewPlace: true,
  isSolo: false,
  prefersEnjoyment: true,
  isSpontaneous: false,
  additionalInfo: '전통 음식 축제를 좋아해요',
};

// AI 추천이 있는 경우의 초기 entries (문자열로 변경)
const initialEntriesWithAI = [API_ENDPOINTS.FESTIVALS.replace(':areaId', '2')];

/*
-jsdom이 콜론 포함 URL을 처리하다 HTMLBaseElement.href 접근 중 예외를 던짐. 
-Footer를 목킹하면 해당 앵커 자체가 없어져 에러 원천 제거.
*/
vi.mock('@/components/common/Footer', () => ({
  default: () => <div data-testid="footer" />, // 링크 없는 더미
}));

// useLocation 모킹을 위한 변수
let mockLocationState: { requestData: PostFestivalsPickBody } | undefined;

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({
      pathname: '/festivals/2',
      search: '',
      state: mockLocationState,
    }),
    useNavigate: () => vi.fn(),
  };
});

describe('FestivalsPage 테스트', () => {
  describe('스냅샷 테스트', () => {
    test('AI 추천 섹션과 일반 섹션 스냅샷', async () => {
      // Given: AI 추천 데이터가 있을 때
      mockLocationState = { requestData: mockRequestData };

      render(
        <TestWrapper initialEntries={initialEntriesWithAI}>
          <FestivalsPage />
        </TestWrapper>,
      );

      // Suspense fallbacks가 아닌 실제 섹션 제목이 나타날 때까지 대기
      await screen.findByRole('heading', { name: '맞춤 AI Pick 축제' });
      await screen.findByRole('heading', { name: '지역의 축제' });

      const aiPickHeading = screen.getByRole('heading', { name: '맞춤 AI Pick 축제' });
      const aiPickSection = aiPickHeading.closest('section');
      const festivalsHeading = screen.getByRole('heading', { name: '지역의 축제' });
      const festivalsSection = festivalsHeading.closest('section');

      const aiGrid = aiPickSection?.querySelector('.grid');
      expect(aiGrid?.children[0]).toMatchSnapshot('ai-pick-first-card');

      const festivalsGrid = festivalsSection?.querySelector('.grid');
      expect(festivalsGrid?.children[0]).toMatchSnapshot('festivals-first-card');
    });

    test('AI 추천이 없을 때 일반 섹션만 스냅샷', async () => {
      // Given: AI 추천 데이터가 없을 때
      mockLocationState = undefined;

      const { container } = render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalsPage />
        </TestWrapper>,
      );

      // 실제 섹션 제목 로드까지 대기
      await screen.findByRole('heading', { name: '지역의 축제' });

      const sections = container.querySelectorAll('section');
      const [festivalsSection] = sections;

      const festivalsGrid = festivalsSection.querySelector('.grid');
      expect(festivalsGrid?.children[0]).toMatchSnapshot('festivals-only-first-card');
    });
  });

  describe('AI 추천 섹션', () => {
    beforeEach(() => {
      // 각 테스트 전에 mock state 초기화
      mockLocationState = undefined;
    });

    test('AI 추천 데이터가 있을 때 AI Pick 섹션이 표시된다', async () => {
      // Given: Pick 페이지에서 전달된 requestData가 있을 때
      mockLocationState = { requestData: mockRequestData };

      // When: FestivalsPage를 렌더링하면
      render(
        <TestWrapper initialEntries={initialEntriesWithAI}>
          <FestivalsPage />
        </TestWrapper>,
      );

      // Then: AI Pick 섹션이 표시되어야 한다
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: '맞춤 AI Pick 축제' })).toBeInTheDocument();
      });

      // AI Pick 섹션에서 mock 데이터의 축제들이 표시되는지 확인
      const aiPickHeading = screen.getByRole('heading', { name: '맞춤 AI Pick 축제' });
      const aiPickSection = aiPickHeading.closest('section');
      expect(aiPickSection).toBeTruthy();

      if (!aiPickSection) return;

      const aiScope = within(aiPickSection);

      // 첫 번째 축제 확인
      expect(aiScope.getByText(festivalsPickMockData[0].title)).toBeInTheDocument();
      expect(
        aiScope.getByText(festivalsPickMockData[0].startDate, { exact: false }),
      ).toBeInTheDocument();

      // 두 번째 축제 확인
      expect(aiScope.getByText(festivalsPickMockData[1].title)).toBeInTheDocument();
      expect(
        aiScope.getByText(festivalsPickMockData[1].startDate, { exact: false }),
      ).toBeInTheDocument();
    });

    test('AI 추천 데이터가 없을 때 AI Pick 섹션이 표시되지 않는다', async () => {
      // Given: requestData가 없을 때 (mockLocationState는 null)
      // When: FestivalsPage를 렌더링하면
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalsPage />
        </TestWrapper>,
      );

      // Then: 일반 Festivals 섹션이 로드될 때까지 기다림
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: '지역의 축제' })).toBeInTheDocument();
      });

      // AI Pick 제목이 없어야 함
      expect(screen.queryByRole('heading', { name: '맞춤 AI Pick 축제' })).not.toBeInTheDocument();

      // 일반 축제 데이터가 표시되는지 확인
      expect(screen.getByText(festivalsMockData.content[0].title)).toBeInTheDocument();
    });

    test('AI 추천 API 호출이 실패해도 에러가 발생하지 않는다', async () => {
      // Given: AI 추천 API가 실패할 때
      const postFestivalsPickMock = await import('@/apis/festivals/postFestivalsPick');
      vi.mocked(postFestivalsPickMock.default).mockRejectedValueOnce(new Error('AI API Error'));

      mockLocationState = { requestData: mockRequestData };

      // When: requestData와 함께 FestivalsPage를 렌더링하면
      render(
        <TestWrapper initialEntries={initialEntriesWithAI}>
          <FestivalsPage />
        </TestWrapper>,
      );

      // Then: 에러가 발생하지 않고 일반 Festivals 섹션은 표시되어야 한다
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: '지역의 축제' })).toBeInTheDocument();
        // AI Pick 섹션은 표시되지 않아야 함
        expect(
          screen.queryByRole('heading', { name: '맞춤 AI Pick 축제' }),
        ).not.toBeInTheDocument();
      });
    });
  });
});

describe('축제 목록 섹션', () => {
  test('API에서 가져온 축제 목록이 표시된다', async () => {
    // Given: API가 축제 데이터를 성공적으로 반환할 때

    // When: FestivalsPage를 렌더링하면
    const { container } = render(
      <TestWrapper initialEntries={initialEntries}>
        <FestivalsPage />
      </TestWrapper>,
    );

    // Then: Festivals 섹션 내에서 축제들이 표시되어야 한다
    await waitFor(() => {
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThanOrEqual(2);
    });

    // "Festivals" 섹션을 기준으로 범위를 한정해 중복 매치를 방지한다
    const festivalsHeading = await screen.findByRole('heading', { name: '지역의 축제' });
    const festivalsSection = festivalsHeading.closest('section');
    expect(festivalsSection).toBeTruthy();

    if (!festivalsSection) return;

    const scope = within(festivalsSection);

    // 각 카드의 타이틀로 카드 컨테이너(anchor)를 찾고, 그 내부에서 날짜/주소를 검증한다
    const titleEl0 = scope.getByText(festivalsMockData.content[0].title);
    const card0 = titleEl0.closest('a') ?? titleEl0.closest('div');
    expect(card0).toBeTruthy();
    if (!card0) return;

    const titleEl1 = scope.getByText(festivalsMockData.content[1].title);
    const card1 = titleEl1.closest('a') ?? titleEl1.closest('div');
    expect(card1).toBeTruthy();
    if (!card1) return;

    const titleEl2 = scope.getByText(festivalsMockData.content[2].title);
    const card2 = titleEl2.closest('a') ?? titleEl2.closest('div');
    expect(card2).toBeTruthy();
    if (!card2) return;

    // 시작일
    expect(
      within(card0).getByText(festivalsMockData.content[0].startDate, { exact: false }),
    ).toBeInTheDocument();
    expect(
      within(card1).getByText(festivalsMockData.content[1].startDate, { exact: false }),
    ).toBeInTheDocument();
    expect(
      within(card2).getByText(festivalsMockData.content[2].startDate, { exact: false }),
    ).toBeInTheDocument();

    // 주소 앞 두 단어
    const area0 = festivalsMockData.content[0].addr1.split(' ').slice(0, 2).join(' ');
    const area1 = festivalsMockData.content[1].addr1.split(' ').slice(0, 2).join(' ');
    const area2 = festivalsMockData.content[2].addr1.split(' ').slice(0, 2).join(' ');
    expect(within(card0).getByText(area0, { exact: false })).toBeInTheDocument();
    expect(within(card1).getByText(area1, { exact: false })).toBeInTheDocument();
    expect(within(card2).getByText(area2, { exact: false })).toBeInTheDocument();
  });
});

test('로딩 상태가 올바르게 표시된다', async () => {
  // Given: API 호출이 진행 중일 때
  // When: FestivalsPage를 렌더링하면
  render(
    <TestWrapper initialEntries={initialEntries}>
      <FestivalsPage />
    </TestWrapper>,
  );

  // Then: 스켈레톤 UI가 표시되어야 한다
  const skeletons = document.querySelectorAll('.animate-pulse');
  expect(skeletons.length).toBeGreaterThan(0);

  await waitFor(() => {
    expect(document.querySelectorAll('.animate-pulse').length).toBe(0);
  });
});

test('API 에러 상태가 올바르게 처리된다 (ErrorBoundary가 렌더링되므로 해당 섹션 텍스트가 나타나지 않는다)', async () => {
  // Given: API 호출이 실패할 때
  const getFestivalsMock = await import('@/apis/festivals/getFestivals');
  vi.mocked(getFestivalsMock.default).mockRejectedValueOnce(new Error('API Error'));
  // When: FestivalsPage를 렌더링하면
  render(
    <TestWrapper initialEntries={initialEntries}>
      <FestivalsPage />
    </TestWrapper>,
  );

  // Then: ErrorBoundary가 렌더링되므로 해당 섹션 텍스트가 나타나지 않는다
  await waitFor(() => {
    expect(screen.queryByText('지역의 축제')).not.toBeInTheDocument();
  });
});
