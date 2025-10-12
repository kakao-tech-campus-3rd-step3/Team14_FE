import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/common/Button';

describe('Button 컴포넌트', () => {
  describe('스냅샷 테스트', () => {
    test('기본 Button 컴포넌트 스냅샷', () => {
      const { container } = render(<Button>기본 버튼</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    test.each([
      ['primary', '주 버튼'],
      ['secondary', '보조 버튼'],
      ['tertiary', '3차 버튼'],
      ['icon', '아이콘 버튼'],
      ['link', '링크 버튼'],
    ] as const)('%s variant 스냅샷', (variant, text) => {
      const { container } = render(<Button variant={variant}>{text}</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    test.each([
      ['sm', '작은 버튼'],
      ['md', '중간 버튼'],
      ['lg', '큰 버튼'],
    ] as const)('%s size 스냅샷', (size, text) => {
      const { container } = render(<Button size={size}>{text}</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('fullWidth Button 스냅샷', () => {
      const { container } = render(<Button fullWidth>전체 너비 버튼</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('disabled Button 스냅샷', () => {
      const { container } = render(<Button disabled>비활성화 버튼</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('커스텀 className과 props가 적용된 Button 스냅샷', () => {
      const { container } = render(
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          className="custom-class"
          id="test-button"
          data-testid="snapshot-button"
        >
          복합 속성 버튼
        </Button>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('기본 렌더링', () => {
    test('children이 올바르게 렌더링된다', () => {
      // Given: 버튼 텍스트가 주어졌을 때
      const buttonText = '클릭하세요';

      // When: 텍스트를 children으로 한 Button 컴포넌트를 렌더링하면
      render(<Button>{buttonText}</Button>);

      // Then: 텍스트가 포함된 버튼이 화면에 표시돼야 한다
      expect(screen.getByRole('button', { name: buttonText })).toBeVisible();
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
