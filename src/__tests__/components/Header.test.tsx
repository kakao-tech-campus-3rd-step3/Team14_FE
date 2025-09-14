import { render, screen } from '@testing-library/react';
import Header from '@/components/common/Header';

describe('Header 컴포넌트', () => {
  describe('스냅샷 테스트', () => {
    test('logo variant가 렌더링된다', () => {
      // Given: Header 컴포넌트가 주어졌을 때
      // When: props를 지정하지 않고 Header 컴포넌트를 렌더링하면
      // Then: logo variant가 표시돼야 한다
      const { container } = render(<Header />);
      expect(container).toMatchSnapshot();
    });

    test('page variant가 렌더링된다', () => {
      // Given: Header 컴포넌트가 주어졌을 때
      // When: page variant와 title로 Header 컴포넌트를 렌더링하면
      // Then: page variant가 표시돼야 한다
      const { container } = render(<Header variant="page" title="테스트" />);
      expect(container).toMatchSnapshot();
    });

    test('all variant가 렌더링된다', () => {
      // Given: Header 컴포넌트가 주어졌을 때
      // When: all variant와 title로 Header 컴포넌트를 렌더링하면
      // Then: all variant가 표시돼야 한다
      const { container } = render(<Header variant="all" title="테스트" />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Title 테스트', () => {
    test('title이 올바르게 표시된다', () => {
      // Given: 특정 title이 주어졌을 때
      const customTitle = '커스텀 제목';

      // When: page variant와 해당 title로 Header 컴포넌트를 렌더링하면
      render(<Header variant="page" title={customTitle} />);

      // Then: 지정한 title이 h1 요소에 표시돼야 한다
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(customTitle);
    });

    test('빈 title이 처리된다', () => {
      // Given: 빈 title이 주어졌을 때
      // When: page variant와 빈 title로 Header 컴포넌트를 렌더링하면
      render(<Header variant="page" title="" />);

      // Then: 빈 h1 요소가 렌더링되어야 한다
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('');
    });
  });
});
