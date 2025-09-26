import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import FestivalInfoPage from '@/pages/FestivalInfo/FestivalInfoPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ROUTE_PATH } from '@/constants/routes';

const createTestClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0, gcTime: 0, refetchOnWindowFocus: false },
    },
  });

const TestWrapper = ({
  initialEntries = [ROUTE_PATH.FESTIVAL_INFO.replace(':festivalId', '1')],
}: {
  initialEntries?: string[];
}) => {
  const client = createTestClient();
  return (
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path={ROUTE_PATH.FESTIVAL_INFO} element={<FestivalInfoPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('FestivalInfoPage 테스트', () => {
  describe('스냅샷 테스트', () => {
    test('로딩 상태 스냅샷', () => {
      // Given: 페이지 최초 진입
      const { container } = render(<TestWrapper />);

      // When: 쿼리가 아직 진행 중일 때
      expect(screen.getByText('축제 정보를 불러오는 중')).toBeInTheDocument();

      // Then: 로딩 UI 스냅샷을 남긴다
      expect(container.firstChild).toMatchSnapshot();
    });

    test('로딩 완료 스냅샷', async () => {
      // Given: 페이지 최초 진입
      const { container } = render(<TestWrapper />);

      // When: 데이터 로드가 완료되면
      await screen.findByText('가평 양떼목장 수국축제');

      // Then: 로딩이 끝난 화면으로 스냅샷을 남긴다
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('기본 렌더링(api 호출 성공)', () => {
    test('축제 타이틀과 포스터 섹션이 표시된다', async () => {
      // Given: 유효한 festivalId로 페이지 진입
      render(<TestWrapper />);

      // When: 페이지가 렌더링되고 데이터가 로드되면
      const title = await screen.findByText('가평 양떼목장 수국축제');

      // Then: 타이틀이 화면에 보여야 한다
      expect(title).toBeInTheDocument();
    });

    test('상세정보 섹션 제목이 표시된다', async () => {
      // Given: 페이지가 렌더링된 상태
      render(<TestWrapper />);

      // When: 데이터 로드가 완료되면
      const overviewHeading = await screen.findByText('상세정보');

      // Then: 상세정보 제목이 보여야 한다
      expect(overviewHeading).toBeInTheDocument();
    });

    test('푸터 버튼들이 표시된다', async () => {
      // Given: 페이지가 렌더링된 상태
      render(<TestWrapper />);

      // When: 데이터 로드가 완료되면
      await screen.findByText('가평 양떼목장 수국축제');

      // Then: 푸터의 두 버튼이 보여야 한다
      expect(screen.getByText('리뷰하기')).toBeInTheDocument();
      expect(screen.getByText('채팅 참여하기')).toBeInTheDocument();
    });
  });

  describe('상세정보 더보기/접기 상호작용', () => {
    test('더보기 버튼을 클릭하면 내용이 펼쳐지고, 접기 버튼으로 돌아간다', async () => {
      // Given: 긴 상세정보가 존재하는 축제 상세 페이지
      render(<TestWrapper />);

      // When: 데이터가 로드되어 더보기 버튼이 나타나면
      const moreButton = await screen.findByRole('button', { name: '더보기' });

      // Then: 축약된 텍스트(말줄임표 ...)가 보인다
      expect(screen.getByText(/\.\.\.$/)).toBeInTheDocument();

      // When: 더보기 버튼을 클릭하면
      fireEvent.click(moreButton);

      // Then: 접기 버튼으로 변경되고, 말줄임표가 사라진다
      expect(await screen.findByRole('button', { name: '접기' })).toBeInTheDocument();
      expect(screen.queryByText(/\.\.\.$/)).not.toBeInTheDocument();

      // When: 접기 버튼을 다시 클릭하면
      fireEvent.click(screen.getByRole('button', { name: '접기' }));

      // Then: 더보기 버튼으로 돌아가고, 말줄임표가 다시 보인다
      expect(await screen.findByRole('button', { name: '더보기' })).toBeInTheDocument();
      expect(screen.getByText(/\.\.\.$/)).toBeInTheDocument();
    });
  });
});
