import { render, screen } from '@testing-library/react';
import Header from '@/components/common/Header';

describe('Header 컴포넌트', () => {
  describe('기본 렌더링', () => {
    test('기본 props로 logo variant가 렌더링된다', () => {
      // Given: Header 컴포넌트가 주어졌을 때
      // When: props를 지정하지 않고 Header 컴포넌트를 렌더링하면
      render(<Header />);

      // Then: 기본값인 logo variant가 표시돼야 한다
      expect(screen.getByText('FestaPick')).toBeInTheDocument();
    });

    test('Header 구조가 올바르게 렌더링된다', () => {
      // Given: Header 컴포넌트가 주어졌을 때
      // When: Header 컴포넌트를 렌더링하면
      const { container } = render(<Header />);

      // Then: 기본 구조 클래스가 적용돼야 한다
      const outerDiv = container.firstChild as HTMLElement;
      expect(outerDiv).toHaveClass('w-full', 'fixed', 'top-0', 'bg-gray-100');

      const innerDiv = outerDiv.firstChild as HTMLElement;
      expect(innerDiv).toHaveClass('w-full', 'max-w-[480px]', 'h-12', 'bg-white');
    });
  });

  describe('Variant 테스트', () => {
    test('logo variant가 올바르게 렌더링된다', () => {
      // Given: logo variant가 주어졌을 때
      // When: variant="logo"로 Header 컴포넌트를 렌더링하면
      render(<Header variant="logo" />);

      // Then: 로고와 앱 이름이 표시돼야 한다
      expect(screen.getByText('FestaPick')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('FestaPick');
    });

    test('page variant가 올바르게 렌더링된다', () => {
      // Given: page variant와 title이 주어졌을 때
      const testTitle = '테스트 페이지';

      // When: variant="page"와 title로 Header 컴포넌트를 렌더링하면
      render(<Header variant="page" title={testTitle} />);

      // Then: 뒤로가기 버튼과 페이지 제목이 표시돼야 한다
      expect(screen.getByText(testTitle)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(testTitle);
      expect(screen.getByRole('button')).toBeInTheDocument(); // 뒤로가기 버튼
    });

    test('all variant가 올바르게 렌더링된다', () => {
      // Given: all variant와 title이 주어졌을 때
      const testTitle = '전체 헤더';

      // When: variant="all"과 title로 Header 컴포넌트를 렌더링하면
      render(<Header variant="all" title={testTitle} />);

      // Then: 뒤로가기 버튼, 제목, 홈/프로필 버튼이 모두 표시돼야 한다
      expect(screen.getByText(testTitle)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(testTitle);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2); // 뒤로가기 버튼 + 홈/프로필 버튼
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

  describe('레이아웃 테스트', () => {
    test('Header가 올바른 레이아웃을 가진다', () => {
      // Given: Header 컴포넌트가 주어졌을 때
      // When: Header 컴포넌트를 렌더링하면
      const { container } = render(<Header />);

      // Then: 외부 컨테이너는 고정 위치 클래스를, 내부 컨테이너는 크기 제한 클래스를 가져야 한다
      const outerDiv = container.firstChild as HTMLElement;
      expect(outerDiv).toHaveClass('fixed', 'top-0', 'z-999');

      const innerDiv = outerDiv.firstChild as HTMLElement;
      expect(innerDiv).toHaveClass('max-w-[480px]', 'h-12');
    });
  });

  describe('버튼 테스트', () => {
    test('page variant에서 뒤로가기 버튼이 렌더링된다', () => {
      // Given: page variant가 주어졌을 때
      // When: variant="page"로 Header 컴포넌트를 렌더링하면
      render(<Header variant="page" title="테스트" />);

      // Then: 뒤로가기 버튼이 렌더링되어야 한다
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(1);
    });

    test('all variant에서 모든 버튼이 렌더링된다', () => {
      // Given: all variant가 주어졌을 때
      // When: variant="all"로 Header 컴포넌트를 렌더링하면
      render(<Header variant="all" title="테스트" />);

      // Then: 뒤로가기 버튼과 홈/프로필 버튼이 모두 렌더링되어야 한다
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });

    test('logo variant에서는 버튼이 없다', () => {
      // Given: logo variant가 주어졌을 때
      // When: variant="logo"로 Header 컴포넌트를 렌더링하면
      render(<Header variant="logo" />);

      // Then: 버튼이 렌더링되지 않아야 한다
      const buttons = screen.queryAllByRole('button');
      expect(buttons).toHaveLength(0);
    });
  });

  describe('접근성 테스트', () => {
    test('제목이 적절한 heading 레벨을 가진다', () => {
      // Given: Header 컴포넌트가 주어졌을 때
      // When: Header 컴포넌트를 렌더링하면
      render(<Header variant="page" title="접근성 테스트" />);

      // Then: h1 요소로 제목이 렌더링되어야 한다
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    test('버튼들이 접근 가능하다', () => {
      // Given: all variant Header가 주어졌을 때
      // When: variant="all"로 Header 컴포넌트를 렌더링하면
      render(<Header variant="all" title="버튼 접근성" />);

      // Then: 모든 버튼이 접근 가능해야 한다
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('조건부 렌더링 테스트', () => {
    test('logo variant일 때 로고 요소만 렌더링된다', () => {
      // Given: logo variant가 주어졌을 때
      // When: variant="logo"로 Header 컴포넌트를 렌더링하면
      render(<Header variant="logo" />);

      // Then: FestaPick 텍스트는 있고 뒤로가기 버튼은 없어야 한다
      expect(screen.getByText('FestaPick')).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    test('page variant일 때 홈/프로필 버튼이 렌더링되지 않는다', () => {
      // Given: page variant가 주어졌을 때
      // When: variant="page"로 Header 컴포넌트를 렌더링하면
      render(<Header variant="page" title="페이지 테스트" />);

      // Then: 뒤로가기 버튼만 있고 홈/프로필 버튼은 없어야 한다
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(1);
    });
  });
});
