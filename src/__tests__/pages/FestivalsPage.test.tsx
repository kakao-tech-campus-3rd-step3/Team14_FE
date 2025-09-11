import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import FestivalsPage from '@/pages/Festivals/FestivalsPage';
import * as getFestivalsApi from '@/apis/festivals/getFestivals';
import type { GetFestivalsResponse } from '@/apis/festivals/getFestivals';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { ApiErrorResponse } from '@/apis/instance';

// API 모킹
vi.mock('@/apis/festivals/getFestivals');
const mockGetFestivals = vi.mocked(getFestivalsApi.default);

// 테스트용 축제 데이터
const mockFestivalsData: AxiosResponse<GetFestivalsResponse, ApiErrorResponse> = {
  data: {
    content: [
      {
        id: 1,
        title: '서울 벚꽃축제',
        addr1: '서울특별시 영등포구 여의도동',
        addr2: '여의도 한강공원',
        imageUrl: 'https://example.com/cherry-blossom.jpg',
        startDate: '2024-04-01',
        endDate: '2024-04-15',
      },
      {
        id: 2,
        title: '부산 불꽃축제',
        addr1: '부산광역시 수영구 광안동',
        addr2: '광안리 해수욕장',
        imageUrl: 'https://example.com/fireworks.jpg',
        startDate: '2024-10-01',
        endDate: '2024-10-03',
      },
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 10,
      sort: { empty: true, sorted: false, unsorted: true },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    last: false,
    totalElements: 2,
    totalPages: 1,
    first: true,
    size: 10,
    number: 0,
    sort: { empty: true, sorted: false, unsorted: true },
    numberOfElements: 2,
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: { headers: {} } as InternalAxiosRequestConfig,
};

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
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('FestivalsPage 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('페이지 기본 구조', () => {
    test('페이지의 주요 콘텐츠 섹션이 렌더링된다', async () => {
      // Given: API 호출이 성공적으로 데이터를 반환할 때
      mockGetFestivals.mockResolvedValue(
        mockFestivalsData as AxiosResponse<GetFestivalsResponse, ApiErrorResponse>,
      );

      // When: FestivalsPage를 렌더링하면
      render(
        <TestWrapper>
          <FestivalsPage />
        </TestWrapper>,
      );

      // Then: AI 추천 섹션이 표시되어야 한다
      expect(screen.getByText('AI pick')).toBeInTheDocument();

      // API 데이터가 로드되면 축제 목록 섹션도 표시되어야 한다
      await waitFor(() => {
        expect(screen.getByText('Festivals')).toBeInTheDocument();
      });
    });
  });

  describe('AI 추천 섹션', () => {
    test('AI 추천 축제 목록이 표시된다', async () => {
      // Given: API 호출이 성공적으로 데이터를 반환할 때
      mockGetFestivals.mockResolvedValue(mockFestivalsData);

      // When: FestivalsPage를 렌더링하면
      render(
        <TestWrapper>
          <FestivalsPage />
        </TestWrapper>,
      );

      // Then: AI pick 섹션 제목이 표시되어야 한다
      expect(screen.getByRole('heading', { name: 'AI pick' })).toBeInTheDocument();

      // AI 추천 축제 카드들이 표시되어야 한다 (목업 데이터 기반)
      await waitFor(() => {
        expect(screen.getByText('게임문화축제')).toBeInTheDocument();
      });
    });

    test('AI 추천 축제 카드가 클릭 가능하다', async () => {
      // Given: API 호출이 성공적으로 데이터를 반환하고 AI 추천 축제가 표시될 때
      mockGetFestivals.mockResolvedValue(mockFestivalsData);

      render(
        <TestWrapper>
          <FestivalsPage />
        </TestWrapper>,
      );

      // When: AI 추천 축제 카드가 로드되면
      await waitFor(() => {
        expect(screen.getByText('게임문화축제')).toBeInTheDocument();
      });

      // Then: 축제 카드가 호버 효과를 위한 클래스들을 가져야 한다
      const festivalCard = screen.getByText('게임문화축제').closest('.cursor-pointer');
      expect(festivalCard).toBeInTheDocument();
      expect(festivalCard).toHaveClass('hover:scale-[1.02]', 'transition-all', 'duration-100');
    });
  });

  describe('축제 목록 섹션', () => {
    test('API에서 가져온 축제 목록이 표시된다', async () => {
      // Given: API가 축제 데이터를 성공적으로 반환할 때
      mockGetFestivals.mockResolvedValue(mockFestivalsData);

      // When: FestivalsPage를 렌더링하면
      render(
        <TestWrapper>
          <FestivalsPage />
        </TestWrapper>,
      );

      // Then: API에서 가져온 축제들이 표시되어야 한다
      await waitFor(() => {
        expect(screen.getByText('서울 벚꽃축제')).toBeInTheDocument();
        expect(screen.getByText('부산 불꽃축제')).toBeInTheDocument();
      });

      // 축제 정보가 올바르게 표시되어야 한다
      expect(screen.getByText('2024-04-01 ~ 2024-04-15')).toBeInTheDocument();
      expect(screen.getByText('2024-10-01 ~ 2024-10-03')).toBeInTheDocument();
      expect(screen.getByText('서울특별시 영등포구')).toBeInTheDocument();
      expect(screen.getByText('부산광역시 수영구')).toBeInTheDocument();
    });

    test('로딩 상태가 올바르게 표시된다', () => {
      // Given: API 호출이 진행 중일 때
      mockGetFestivals.mockImplementation(
        () => new Promise(() => {}), // 영원히 대기하는 Promise
      );

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

    test('API 에러 상태가 올바르게 처리된다', async () => {
      // Given: API 호출이 실패할 때
      mockGetFestivals.mockRejectedValue(new Error('API Error'));

      // When: FestivalsPage를 렌더링하면
      class ErrorBoundary extends React.Component<React.PropsWithChildren, { hasError: boolean }> {
        constructor(props: React.PropsWithChildren) {
          super(props);
          this.state = { hasError: false };
        }
        static getDerivedStateFromError() {
          return { hasError: true };
        }
        componentDidCatch() {}
        render() {
          if (this.state.hasError) {
            return (
              <div>
                <div>오류가 발생했습니다</div>
                <p>축제 정보를 불러올 수 없습니다.</p>
              </div>
            );
          }
          return this.props.children as React.ReactNode;
        }
      }

      render(
        <TestWrapper>
          <ErrorBoundary>
            <FestivalsPage />
          </ErrorBoundary>
        </TestWrapper>,
      );

      // Then: 에러 메시지가 표시되어야 한다
      await waitFor(() => {
        expect(screen.getByText('오류가 발생했습니다')).toBeInTheDocument();
        expect(screen.getByText('축제 정보를 불러올 수 없습니다.')).toBeInTheDocument();
      });
    });
  });

  describe('반응형 레이아웃', () => {
    test('축제 카드들이 그리드 레이아웃으로 배치된다', async () => {
      // Given: API가 여러 축제 데이터를 반환할 때
      mockGetFestivals.mockResolvedValue(mockFestivalsData);

      // When: FestivalsPage를 렌더링하면
      const { container } = render(
        <TestWrapper>
          <FestivalsPage />
        </TestWrapper>,
      );

      // Then: 그리드 레이아웃 클래스가 적용되어야 한다
      await waitFor(() => {
        const gridContainer = container.querySelector('.grid');
        expect(gridContainer).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
      });
    });

    test('모바일과 데스크탑에서 적절한 패딩이 적용된다', () => {
      // Given: API 호출이 성공적으로 데이터를 반환할 때
      mockGetFestivals.mockResolvedValue(mockFestivalsData);

      // When: FestivalsPage를 렌더링하면
      const { container } = render(
        <TestWrapper>
          <FestivalsPage />
        </TestWrapper>,
      );

      // Then: 반응형 패딩 클래스가 적용되어야 한다
      const mainContent = container.querySelector('.px-8');
      expect(mainContent).toHaveClass('px-8', 'py-4');
    });
  });

  describe('사용자 상호작용', () => {
    test('축제 카드 호버 효과가 적용된다', async () => {
      // Given: API가 축제 데이터를 반환하고 축제 카드가 표시될 때
      mockGetFestivals.mockResolvedValue(mockFestivalsData);

      render(
        <TestWrapper>
          <FestivalsPage />
        </TestWrapper>,
      );

      // When: 축제 카드가 로드되면
      await waitFor(() => {
        expect(screen.getByText('서울 벚꽃축제')).toBeInTheDocument();
      });

      // Then: 호버 효과를 위한 클래스가 적용되어야 한다
      const festivalCard = screen.getByText('서울 벚꽃축제').closest('.cursor-pointer');
      expect(festivalCard).toBeInTheDocument();
      expect(festivalCard).toHaveClass(
        'hover:shadow-xl',
        'hover:scale-[1.02]',
        'transition-all',
        'duration-100',
      );
    });
  });

  describe('데이터 통합', () => {
    test('AI 추천과 실시간 축제 데이터가 모두 표시된다', async () => {
      // Given: API가 실시간 축제 데이터를 반환할 때
      mockGetFestivals.mockResolvedValue(mockFestivalsData);

      // When: FestivalsPage를 렌더링하면
      render(
        <TestWrapper>
          <FestivalsPage />
        </TestWrapper>,
      );

      // Then: AI 추천 섹션이 표시되어야 한다
      expect(screen.getByText('AI pick')).toBeInTheDocument();

      // 각 섹션에 축제 데이터가 표시되어야 한다
      await waitFor(() => {
        // AI 추천 (목업 데이터)
        expect(screen.getByText('게임문화축제')).toBeInTheDocument();
        // 실시간 데이터 (API) - 로딩 후 표시
        expect(screen.getByText('Festivals')).toBeInTheDocument();
        expect(screen.getByText('서울 벚꽃축제')).toBeInTheDocument();
      });
    });

    test('빈 데이터 상태가 적절히 처리된다', async () => {
      // Given: API가 빈 배열을 반환할 때
      const emptyResponse: AxiosResponse<GetFestivalsResponse, ApiErrorResponse> = {
        data: {
          content: [],
          pageable: {
            pageNumber: 0,
            pageSize: 10,
            sort: { empty: true, sorted: false, unsorted: true },
            offset: 0,
            paged: true,
            unpaged: false,
          },
          last: true,
          totalElements: 0,
          totalPages: 0,
          first: true,
          size: 10,
          number: 0,
          sort: { empty: true, sorted: false, unsorted: true },
          numberOfElements: 0,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} } as InternalAxiosRequestConfig,
      };
      mockGetFestivals.mockResolvedValue(emptyResponse);

      // When: FestivalsPage를 렌더링하면
      render(
        <TestWrapper>
          <FestivalsPage />
        </TestWrapper>,
      );

      // Then: AI 추천 섹션은 여전히 표시되어야 한다 (목업 데이터 사용)
      expect(screen.getByText('AI pick')).toBeInTheDocument();

      await waitFor(() => {
        // AI 추천 데이터는 표시되어야 한다
        expect(screen.getByText('게임문화축제')).toBeInTheDocument();
        // 빈 데이터로도 Festivals 섹션은 표시되어야 한다
        expect(screen.getByText('Festivals')).toBeInTheDocument();
      });
    });
  });
});
