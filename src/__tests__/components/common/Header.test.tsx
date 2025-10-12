import { render, screen } from '@testing-library/react';
import Header from '@/components/common/Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header 컴포넌트', () => {
  describe('스냅샷 테스트 - 핵심 요소별', () => {
    test('logo variant - 로고 영역 스냅샷', () => {
      const { container } = render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>,
      );

      // SVG 로고만 스냅샷
      const logoText = screen.getByText('FestaPick');
      expect(logoText).toBeInTheDocument();

      // SVG logo 찾기
      const svgElement = container.querySelector('svg');
      expect(svgElement).toMatchSnapshot('logo-svg');
    });

    test('page variant - 네비게이션 구조 스냅샷', () => {
      render(
        <MemoryRouter>
          <Header variant="page" title="테스트 페이지" />
        </MemoryRouter>,
      );

      // 뒤로가기 버튼만 스냅샷
      const backButton = screen.getByRole('button');
      expect(backButton).toMatchSnapshot('page-variant-back-button');

      // 제목 요소만 스냅샷
      const titleElement = screen.getByRole('heading', { level: 1 });
      expect(titleElement).toMatchSnapshot('page-variant-title');
    });

    test('all variant - 버튼 그룹 스냅샷', () => {
      const { container } = render(
        <MemoryRouter>
          <Header variant="all" title="전체 헤더" />
        </MemoryRouter>,
      );

      // 좌측 버튼 영역
      const leftSection = container.querySelector('.flex-1:first-child');
      expect(leftSection).toMatchSnapshot('all-variant-left-section');

      // 우측 버튼 영역
      const rightSection = container.querySelector('.flex-1:last-child');
      expect(rightSection).toMatchSnapshot('all-variant-right-section');
    });
  });
});
