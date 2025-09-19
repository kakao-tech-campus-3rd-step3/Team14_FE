import { render, screen, fireEvent } from '@testing-library/react';
import OutlineInputField from '@/components/form/OutlineInputField';

describe('OutlineInputField 컴포넌트', () => {
  describe('기본 스냅샷 테스트', () => {
    test('기본 스냅샷 테스트', () => {
      const { container } = render(<OutlineInputField />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('동작 테스트', () => {
    test('errorMsg가 주어지면 에러 텍스트가 렌더링된다', () => {
      render(<OutlineInputField errorMsg="에러 메시지" />);
      expect(screen.getByText('에러 메시지')).toBeVisible();
    });

    test('onChange 이벤트로 값이 변경된다', () => {
      render(<OutlineInputField aria-label="닉네임" defaultValue="" />);
      const input = screen.getByLabelText('닉네임') as HTMLInputElement;
      fireEvent.input(input, { target: { value: 'suho' } });
      expect(input.value).toBe('suho');
    });
  });
});
