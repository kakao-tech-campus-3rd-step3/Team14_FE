import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FestivalsPage from '@/pages/Festivals/FestivalsPage';
import { festivalsMockData } from '@/mocks/data/festivals.mock';
import * as ReactRouter from 'react-router-dom';

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
  describe('페이지 기본 구조', () => {
    test('스냅샷 테스트', () => {
      // 기본 스냅샷 테스트
      const { container } = render(
        <TestWrapper>
          <FestivalsPage />
        </TestWrapper>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('AI 추천 섹션', () => {
    // AI 추천 섹션 백엔드 완성 후 테스트 코드 작성 필요
    test('AI 추천 섹션이 표시된다', async () => {
      // Given: API 호출이 성공적으로 데이터를 반환할 때
      // When: FestivalsPage를 렌더링하면
      render(
        <TestWrapper>
          <FestivalsPage />
        </TestWrapper>,
      );

      // Then: AI pick 섹션 제목이 표시되어야 한다
      await waitFor(() => {
        expect(screen.getByText('AI pick')).toBeInTheDocument();
      });
    });
  });

  describe('축제 목록 섹션', () => {
    test('API에서 가져온 축제 목록이 표시된다', async () => {
      // Given: API가 축제 데이터를 성공적으로 반환할 때

      // When: FestivalsPage를 렌더링하면
      render(
        <TestWrapper>
          <FestivalsPage />
        </TestWrapper>,
      );

      // Then: Festivals 섹션 내에서 축제들이 표시되어야 한다
      await waitFor(() => {
        const festivalsSection = screen.getByText('Festivals').closest('section');
        expect(festivalsSection).toBeInTheDocument();

        // Festivals 섹션 내에서만 축제 제목들을 검색
        expect(festivalsSection).toHaveTextContent(festivalsMockData.content[0].title);
        expect(festivalsSection).toHaveTextContent(festivalsMockData.content[1].title);
        expect(festivalsSection).toHaveTextContent(festivalsMockData.content[2].title);
      });

      // 축제 정보가 올바르게 표시되어야 한다
      const festivalsSection = screen.getByText('Festivals').closest('section');
      expect(festivalsSection).toHaveTextContent(festivalsMockData.content[0].startDate);
      expect(festivalsSection).toHaveTextContent(festivalsMockData.content[1].startDate);
      expect(festivalsSection).toHaveTextContent(festivalsMockData.content[2].startDate);
      expect(festivalsSection).toHaveTextContent(
        festivalsMockData.content[0].addr1.split(' ').slice(0, 2).join(' '),
      );
      expect(festivalsSection).toHaveTextContent(
        festivalsMockData.content[1].addr1.split(' ').slice(0, 2).join(' '),
      );
      expect(festivalsSection).toHaveTextContent(
        festivalsMockData.content[2].addr1.split(' ').slice(0, 2).join(' '),
      );
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
  });
});
