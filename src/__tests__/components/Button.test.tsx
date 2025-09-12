import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/common/Button';

describe('Button 컴포넌트', () => {
  describe('기본 렌더링', () => {
    test('children이 올바르게 렌더링된다', () => {
      // Given: 버튼 텍스트가 주어졌을 때
      const buttonText = '클릭하세요';

      // When: 텍스트를 children으로 한 Button 컴포넌트를 렌더링하면
      render(<Button>{buttonText}</Button>);

      // Then: 텍스트가 포함된 버튼이 화면에 표시돼야 한다
      expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument();
    });

    test('기본 props로 렌더링된다 (variant: primary, size: md)', () => {
      // Given: 버튼 텍스트가 주어졌을 때
      const buttonText = '기본 버튼';

      // When: props를 지정하지 않고 Button 컴포넌트를 렌더링하면
      render(<Button>{buttonText}</Button>);
      const button = screen.getByRole('button');

      // Then: 기본값인 primary variant와 md size 클래스가 적용돼야 한다
      expect(button).toHaveClass('bg-primary-300', 'text-gray-50'); // primary variant
      expect(button).toHaveClass('text-md', 'rounded-xl', 'px-5', 'py-3'); // md size
    });
  });

  describe('Variant 테스트', () => {
    test.each([
      ['primary', ['bg-primary-300', 'text-gray-50']],
      ['secondary', ['bg-primary-50', 'text-primary-300']],
      ['tertiary', ['bg-gray-100', 'text-gray-600']],
      ['icon', ['bg-transparent', 'text-gray-900']],
    ] as const)('%s variant가 올바른 클래스를 적용한다', (variant, expectedClasses) => {
      // Given: 특정 variant가 주어졌을 때
      // When: 해당 variant로 Button 컴포넌트를 렌더링하면
      render(<Button variant={variant}>테스트</Button>);
      const button = screen.getByRole('button');

      // Then: variant에 해당하는 스타일 클래스들이 적용돼야 한다
      expectedClasses.forEach((className) => {
        expect(button).toHaveClass(className);
      });
    });
  });

  describe('Size 테스트', () => {
    test.each([
      ['sm', ['text-sm', 'rounded-lg', 'px-4', 'py-2']],
      ['md', ['text-md', 'rounded-xl', 'px-5', 'py-3']],
      ['lg', ['text-lg', 'rounded-2xl', 'px-6', 'py-4']],
    ] as const)('%s size가 올바른 클래스를 적용한다', (size, expectedClasses) => {
      // Given: 특정 size가 주어졌을 때
      // When: 해당 size로 Button 컴포넌트를 렌더링하면
      render(<Button size={size}>테스트</Button>);
      const button = screen.getByRole('button');

      // Then: size에 해당하는 스타일 클래스들이 적용돼야 한다
      expectedClasses.forEach((className) => {
        expect(button).toHaveClass(className);
      });
    });
  });

  describe('FullWidth 테스트', () => {
    test('fullWidth가 true일 때 w-full 클래스가 적용된다', () => {
      // Given: fullWidth가 true로 주어졌을 때
      // When: fullWidth={true}로 Button 컴포넌트를 렌더링하면
      render(<Button fullWidth>전체 너비</Button>);
      const button = screen.getByRole('button');

      // Then: 전체 너비를 차지하는 w-full 클래스가 적용돼야 한다
      expect(button).toHaveClass('w-full');
    });

    test('fullWidth가 false일 때 w-fit 클래스가 적용된다', () => {
      // Given: fullWidth가 false로 주어졌을 때
      // When: fullWidth={false}로 Button 컴포넌트를 렌더링하면
      render(<Button>맞춤 너비</Button>);
      const button = screen.getByRole('button');

      // Then: 내용에 맞는 너비를 가지는 w-fit 클래스가 적용돼야 한다
      expect(button).toHaveClass('w-fit');
    });
  });

  describe('이벤트 처리', () => {
    test('onClick 이벤트가 올바르게 호출된다', () => {
      // Given: onClick 핸들러가 주어졌을 때
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>클릭 테스트</Button>);

      // When: 버튼을 클릭하면
      fireEvent.click(screen.getByRole('button'));

      // Then: onClick 핸들러가 정확히 1번 호출돼야 한다
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('disabled 상태에서 클릭 이벤트가 호출되지 않는다', () => {
      // Given: onClick 핸들러와 disabled 속성이 주어졌을 때
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} disabled>
          비활성화
        </Button>,
      );

      // When: 비활성화된 버튼을 클릭하면
      fireEvent.click(screen.getByRole('button'));

      // Then: onClick 핸들러가 호출되지 않아야 한다
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('HTML 속성 테스트', () => {
    test('기본 type이 "button"이다', () => {
      // Given: Button 컴포넌트가 주어졌을 때
      // When: type 속성을 지정하지 않고 렌더링하면
      render(<Button>타입 테스트</Button>);
      const button = screen.getByRole('button');

      // Then: 기본값인 "button" type이 적용돼야 한다
      expect(button).toHaveAttribute('type', 'button');
    });

    test('커스텀 className이 추가로 적용된다', () => {
      // Given: 커스텀 className이 주어졌을 때
      const customClass = 'custom-button-class';

      // When: className prop으로 Button 컴포넌트를 렌더링하면
      render(<Button className={customClass}>커스텀 클래스</Button>);
      const button = screen.getByRole('button');

      // Then: 커스텀 클래스와 기본 클래스가 모두 적용돼야 한다
      expect(button).toHaveClass(customClass);
      expect(button).toHaveClass('bg-primary-300'); // 기본 클래스도 유지
    });

    test('추가 HTML 속성들이 올바르게 전달된다', () => {
      // Given: 다양한 HTML 속성들이 주어졌을 때
      // When: 해당 속성들로 Button 컴포넌트를 렌더링하면
      render(
        <Button id="test-button" data-testid="custom-button" aria-label="테스트 버튼">
          속성 테스트
        </Button>,
      );
      const button = screen.getByRole('button');

      // Then: 모든 HTML 속성들이 버튼 요소에 올바르게 전달돼야 한다
      expect(button).toHaveAttribute('id', 'test-button');
      expect(button).toHaveAttribute('data-testid', 'custom-button');
      expect(button).toHaveAttribute('aria-label', '테스트 버튼');
    });
  });

  describe('접근성 테스트', () => {
    test('버튼이 키보드로 접근 가능하다', () => {
      // Given: Button 컴포넌트가 주어졌을 때
      // When: 기본 상태로 렌더링하면
      render(<Button>접근성 테스트</Button>);
      const button = screen.getByRole('button');

      // Then: 키보드 접근을 막는 tabindex="-1"이 없어야 한다
      expect(button).not.toHaveAttribute('tabindex', '-1');
    });

    test('disabled 버튼이 올바른 aria 속성을 가진다', () => {
      // Given: disabled 속성이 주어졌을 때
      // When: disabled={true}로 Button 컴포넌트를 렌더링하면
      render(<Button disabled>비활성화 버튼</Button>);
      const button = screen.getByRole('button');

      // Then: 버튼이 비활성화 상태로 인식돼야 한다
      expect(button).toBeDisabled();
    });
  });
});
