import { render, screen } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginCheckPage from '@/pages/Login/LoginCheckPage';
import { AuthProvider } from '@/context/AuthContext';
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
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ReactRouter.MemoryRouter>
  );
};

describe('LoginCheckPage 테스트', () => {
  describe('페이지 기본 구조', () => {
    test('스냅샷 테스트', () => {
      // 기본 스냅샷 테스트
      const { container } = render(
        <TestWrapper>
          <LoginCheckPage />
        </TestWrapper>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('로딩 상태', () => {
    test('로딩 상태가 올바르게 표시된다', () => {
      render(
        <TestWrapper>
          <LoginCheckPage />
        </TestWrapper>,
      );

      // 로딩 스피너가 표시되어야 한다
      expect(screen.getByText('로그인 처리 중')).toBeInTheDocument();
    });
  });
});
