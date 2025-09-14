import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '@/components/common/Footer';

describe('Footer 컴포넌트', () => {
  describe('기본 렌더링', () => {
    test('모든 네비게이션 버튼이 렌더링된다', () => {
      // Given: Footer 컴포넌트가 주어졌을 때
      // When: Footer 컴포넌트를 렌더링하면
      render(<Footer />);

      // Then: 모든 네비게이션 버튼과 텍스트가 화면에 표시돼야 한다
      expect(screen.getByText('홈')).toBeInTheDocument();
      expect(screen.getByText('검색')).toBeInTheDocument();
      expect(screen.getByText('AI 추천')).toBeInTheDocument();
      expect(screen.getByText('My')).toBeInTheDocument();
    });

    test('4개의 네비게이션 버튼이 있다', () => {
      // Given: Footer 컴포넌트가 주어졌을 때
      // When: Footer 컴포넌트를 렌더링하면
      render(<Footer />);

      // Then: 4개의 버튼이 렌더링되어야 한다
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(4);
    });

    test('Footer 구조가 올바르게 렌더링된다', () => {
      // Given: Footer 컴포넌트가 주어졌을 때
      // When: Footer 컴포넌트를 렌더링하면
      const { container } = render(<Footer />);

      // Then: 올바른 구조와 클래스가 적용돼야 한다
      const outerDiv = container.firstChild as HTMLElement;
      expect(outerDiv).toHaveClass(
        'w-full',
        'mx-auto',
        'flex',
        'flex-col',
        'items-center',
        'fixed',
        'bottom-0',
        'left-0',
        'z-999',
      );

      const innerDiv = outerDiv.firstChild as HTMLElement;
      expect(innerDiv).toHaveClass(
        'w-full',
        'max-w-[480px]',
        'h-15',
        'border-t',
        'border-gray-300',
        'flex',
        'items-center',
        'bg-white',
      );
    });
  });

  describe('initialSelected 테스트', () => {
    test.each([
      ['home', '홈'],
      ['search', '검색'],
      ['pick', 'AI 추천'],
      ['my', 'My'],
    ] as const)('initialSelected가 %s일 때 해당 버튼이 선택된다', (selected, buttonText) => {
      // Given: 특정 initialSelected가 주어졌을 때
      // When: 해당 initialSelected로 Footer 컴포넌트를 렌더링하면
      render(<Footer initialSelected={selected} />);

      // Then: 해당 버튼이 선택된 상태여야 한다
      const button = screen.getByText(buttonText).closest('button');
      expect(button).toBeInTheDocument();

      // 선택된 버튼의 텍스트가 볼드 처리되어야 한다
      const textElement = screen.getByText(buttonText);
      expect(textElement).toHaveClass('font-bold');
    });

    test('선택되지 않은 버튼들은 normal 폰트를 가진다', () => {
      // Given: home이 선택된 Footer가 주어졌을 때
      // When: initialSelected="home"으로 Footer 컴포넌트를 렌더링하면
      render(<Footer initialSelected="home" />);

      // Then: 선택되지 않은 버튼들은 font-normal 클래스를 가져야 한다
      expect(screen.getByText('검색')).toHaveClass('font-normal');
      expect(screen.getByText('AI 추천')).toHaveClass('font-normal');
      expect(screen.getByText('My')).toHaveClass('font-normal');
    });
  });

  describe('상호작용 테스트', () => {
    test('버튼 클릭 시 폰트가 볼드로 변경된다', () => {
      // Given: Footer 컴포넌트가 렌더링되어 있을 때
      render(<Footer />);

      // When: 홈 버튼을 클릭하면
      const homeButton = screen.getByText('홈');
      fireEvent.click(homeButton.closest('button') as HTMLElement);

      // Then: 홈 버튼의 텍스트가 볼드로 변경되어야 한다
      expect(homeButton).toHaveClass('font-bold');
    });

    test('다른 버튼 클릭 시 이전 선택이 해제되고 새 버튼이 선택된다', () => {
      // Given: 홈이 선택된 상태의 Footer 컴포넌트가 렌더링되어 있을 때
      render(<Footer initialSelected="home" />);

      // When: 검색 버튼을 클릭하면
      const searchButton = screen.getByText('검색');
      const homeButton = screen.getByText('홈');
      fireEvent.click(searchButton.closest('button') as HTMLElement);

      // Then: 검색 버튼은 볼드가 되고 홈 버튼은 normal이 되어야 한다
      expect(searchButton).toHaveClass('font-bold');
      expect(homeButton).toHaveClass('font-normal');
    });

    test('여러 버튼을 순차적으로 클릭할 수 있다', () => {
      // Given: Footer 컴포넌트가 렌더링되어 있을 때
      render(<Footer />);

      // When: 각 버튼을 순차적으로 클릭하면
      const buttonLabels = ['홈', 'AI 추천', 'My'];

      buttonLabels.forEach((label) => {
        const button = screen.getByText(label);
        fireEvent.click(button.closest('button') as HTMLElement);

        // Then: 클릭된 버튼의 텍스트가 볼드로 변경되어야 한다
        expect(button).toHaveClass('font-bold');
      });
    });
  });

  describe('레이아웃 테스트', () => {
    test('Footer가 하단에 고정된다', () => {
      // Given: Footer 컴포넌트가 주어졌을 때
      // When: Footer 컴포넌트를 렌더링하면
      const { container } = render(<Footer />);

      // Then: 하단 고정 클래스가 적용돼야 한다
      const outerDiv = container.firstChild as HTMLElement;
      expect(outerDiv).toHaveClass('fixed', 'bottom-0', 'left-0');
    });

    test('최대 너비 제한이 적용된다', () => {
      // Given: Footer 컴포넌트가 주어졌을 때
      // When: Footer 컴포넌트를 렌더링하면
      const { container } = render(<Footer />);

      // Then: 내부 컨테이너에 최대 너비 480px이 적용돼야 한다
      const outerDiv = container.firstChild as HTMLElement;
      const innerDiv = outerDiv.firstChild as HTMLElement;
      expect(innerDiv).toHaveClass('max-w-[480px]');
    });

    test('z-index가 적용된다', () => {
      // Given: Footer 컴포넌트가 주어졌을 때
      // When: Footer 컴포넌트를 렌더링하면
      const { container } = render(<Footer />);

      // Then: z-index 클래스가 적용돼야 한다
      const outerDiv = container.firstChild as HTMLElement;
      expect(outerDiv).toHaveClass('z-999');
    });
  });

  describe('접근성 테스트', () => {
    test('모든 버튼이 접근 가능하다', () => {
      // Given: Footer 컴포넌트가 주어졌을 때
      // When: Footer 컴포넌트를 렌더링하면
      render(<Footer />);

      // Then: 모든 버튼이 role="button"으로 접근 가능해야 한다
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(4);

      buttons.forEach((button) => {
        expect(button).not.toHaveAttribute('tabindex', '-1');
      });
    });

    test('버튼에 적절한 텍스트 라벨이 있다', () => {
      // Given: Footer 컴포넌트가 주어졌을 때
      // When: Footer 컴포넌트를 렌더링하면
      render(<Footer />);

      // Then: 각 버튼에 텍스트 라벨이 포함되어야 한다
      expect(screen.getByRole('button', { name: /홈/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /검색/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /AI 추천/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /My/i })).toBeInTheDocument();
    });
  });
});
