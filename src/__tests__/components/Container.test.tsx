import { render, screen } from '@testing-library/react';
import Container from '@/components/common/Container';

describe('Container 컴포넌트', () => {
  describe('스냅샷 테스트', () => {
    test('Container가 렌더링된다', () => {
      // Given: Container 컴포넌트가 주어졌을 때
      // When: Container 컴포넌트를 렌더링하면
      // Then: Container가 렌더링된다
      const { container } = render(<Container>테스트</Container>);
      expect(container).toMatchSnapshot();
    });
  });
  describe('children 테스트', () => {
    test('children이 올바르게 렌더링된다', () => {
      // Given: children 요소가 주어졌을 때
      const childText = '테스트 컨텐츠';

      // When: children을 포함한 Container 컴포넌트를 렌더링하면
      render(
        <Container>
          <div>{childText}</div>
        </Container>,
      );

      // Then: children 요소가 화면에 표시돼야 한다
      expect(screen.getByText(childText)).toBeVisible();
    });
  });

  describe('기능 테스트', () => {
    test('여러 children을 올바르게 렌더링한다', () => {
      // Given: 여러 children 요소가 주어졌을 때
      // When: 여러 children으로 Container 컴포넌트를 렌더링하면
      render(
        <Container>
          <div>첫 번째 요소</div>
          <div>두 번째 요소</div>
          <div>세 번째 요소</div>
        </Container>,
      );

      // Then: 모든 children이 화면에 표시돼야 한다
      expect(screen.getByText('첫 번째 요소')).toBeVisible();
      expect(screen.getByText('두 번째 요소')).toBeVisible();
      expect(screen.getByText('세 번째 요소')).toBeVisible();
    });
  });
});
