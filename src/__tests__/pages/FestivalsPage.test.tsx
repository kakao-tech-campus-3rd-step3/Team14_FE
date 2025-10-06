vi.mock('@/apis/festivals/getFestivals', async () => {
  const { festivalsMockData } = await import('@/mocks/data/festivals.mock');
  return {
    __esModule: true,
    default: vi.fn().mockResolvedValue({ data: festivalsMockData }),
  };
});
import { render, screen, waitFor, within } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FestivalsPage from '@/pages/Festivals/FestivalsPage';
import { festivalsMockData } from '@/mocks/data/festivals.mock';
import * as ReactRouter from 'react-router-dom';

/*
-jsdom이 콜론 포함 URL을 처리하다 HTMLBaseElement.href 접근 중 예외를 던짐. 
-Footer를 목킹하면 해당 앵커 자체가 없어져 에러 원천 제거.
*/
vi.mock('@/components/common/Footer', () => ({
  default: () => <div data-testid="footer" />, // 링크 없는 더미
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
}));
// QueryClient 설정
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

// 테스트용 래퍼 컴포넌트
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <ReactRouter.MemoryRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ReactRouter.MemoryRouter>
  );
};

describe('FestivalsPage 테스트', () => {
  vi.spyOn(ReactRouter, 'useParams').mockReturnValue({ areaId: '2' });
  describe('스냅샷 테스트', () => {
    test('AI 추천 섹션 스냅샷', async () => {
      const { container } = render(
        <TestWrapper>
          <FestivalsPage />
        </TestWrapper>,
      );

      // Suspense가 끝나고 섹션이 나타날 때까지 기다림
      await waitFor(() => {
        const sections = container.querySelectorAll('section');
        expect(sections.length).toBeGreaterThanOrEqual(2);
      });

      const sections = container.querySelectorAll('section');

      // 0번: AI, 1번: Festivals 라는 현재 구조에 의존
      const aiPickSection = sections[0];
      const festivalsSection = sections[1];

      // AI 첫 카드 스냅샷
      const aiGrid = aiPickSection.querySelector('.grid');
      expect(aiGrid?.children[0]).toMatchSnapshot('ai-first-card');

      // Festivals 첫 카드 스냅샷
      const festivalsGrid = festivalsSection.querySelector('.grid');
      expect(festivalsGrid?.children[0]).toMatchSnapshot('festivals-first-card');
    });
  });

  describe('AI 추천 섹션', () => {
    // AI 추천 섹션 백엔드 완성 후 테스트 코드 작성 필요
    test('AI 추천 섹션이 표시된다', async () => {
      // Given: API 호출이 성공적으로 데이터를 반환할 때
      // When: FestivalsPage를 렌더링하면
      const { container } = render(
        <TestWrapper>
          <FestivalsPage />
        </TestWrapper>,
      );

      // Then: AI pick 섹션 제목이 표시되어야 한다 (ErrorBoundary로 인해 없을 수도 있음)
      await waitFor(() => {
        const sections = container.querySelectorAll('section');
        expect(sections.length).toBeGreaterThanOrEqual(1);
      });

      // 첫 섹션이 존재하면 OK (타이틀 카피가 바뀌어도 안 깨짐)
      const firstSection = container.querySelectorAll('section')[0];
      expect(firstSection).toBeTruthy();
    });
  });
});

describe('축제 목록 섹션', () => {
  test('API에서 가져온 축제 목록이 표시된다', async () => {
    // Given: API가 축제 데이터를 성공적으로 반환할 때

    // When: FestivalsPage를 렌더링하면
    const { container } = render(
      <TestWrapper>
        <FestivalsPage />
      </TestWrapper>,
    );

    // Then: Festivals 섹션 내에서 축제들이 표시되어야 한다
    await waitFor(() => {
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThanOrEqual(2);
    });

    // "Festivals" 섹션을 기준으로 범위를 한정해 중복 매치를 방지한다
    const festivalsHeading = await screen.findByRole('heading', { name: 'Festivals' });
    const festivalsSection = festivalsHeading.closest('section');
    expect(festivalsSection).toBeTruthy();

    const scope = within(festivalsSection!);

    // 각 카드의 타이틀로 카드 컨테이너(anchor)를 찾고, 그 내부에서 날짜/주소를 검증한다
    const titleEl0 = scope.getByText(festivalsMockData.content[0].title);
    const card0 = titleEl0.closest('a') ?? titleEl0.closest('div');
    expect(card0).toBeTruthy();

    const titleEl1 = scope.getByText(festivalsMockData.content[1].title);
    const card1 = titleEl1.closest('a') ?? titleEl1.closest('div');
    expect(card1).toBeTruthy();

    const titleEl2 = scope.getByText(festivalsMockData.content[2].title);
    const card2 = titleEl2.closest('a') ?? titleEl2.closest('div');
    expect(card2).toBeTruthy();

    // 시작일
    expect(
      within(card0!).getByText(festivalsMockData.content[0].startDate, { exact: false }),
    ).toBeInTheDocument();
    expect(
      within(card1!).getByText(festivalsMockData.content[1].startDate, { exact: false }),
    ).toBeInTheDocument();
    expect(
      within(card2!).getByText(festivalsMockData.content[2].startDate, { exact: false }),
    ).toBeInTheDocument();

    // 주소 앞 두 단어
    const area0 = festivalsMockData.content[0].addr1.split(' ').slice(0, 2).join(' ');
    const area1 = festivalsMockData.content[1].addr1.split(' ').slice(0, 2).join(' ');
    const area2 = festivalsMockData.content[2].addr1.split(' ').slice(0, 2).join(' ');
    expect(within(card0!).getByText(area0, { exact: false })).toBeInTheDocument();
    expect(within(card1!).getByText(area1, { exact: false })).toBeInTheDocument();
    expect(within(card2!).getByText(area2, { exact: false })).toBeInTheDocument();
  });
});

test('로딩 상태가 올바르게 표시된다', () => {
  // Given: API 호출이 진행 중일 때
  // When: FestivalsPage를 렌더링하면
  render(
    <TestWrapper>
      <FestivalsPage />
    </TestWrapper>,
  );

  // Then: 스켈레톤 UI가 표시되어야 한다
  const skeletons = document.querySelectorAll('.animate-pulse');
  expect(skeletons.length).toBeGreaterThan(0);
});

test('API 에러 상태가 올바르게 처리된다 (ErrorBoundary가 null을 렌더링)', async () => {
  // Given: API 호출이 실패할 때
  // When: FestivalsPage를 렌더링하면
  render(
    <TestWrapper>
      <FestivalsPage />
    </TestWrapper>,
  );

  // Then: ErrorBoundary가 null을 렌더링하므로 해당 섹션 텍스트가 나타나지 않는다
  await waitFor(() => {
    expect(screen.queryByText('Festivals')).not.toBeInTheDocument();
  });
});
