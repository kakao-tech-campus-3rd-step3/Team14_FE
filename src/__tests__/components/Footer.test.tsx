import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '@/components/common/Footer';

describe('Footer 컴포넌트', () => {
  describe('기본 렌더링', () => {
    test('Footer가 렌더링된다', () => {
      // Given: Footer 컴포넌트가 주어졌을 때
      // When: Footer 컴포넌트를 렌더링하면
      const { container } = render(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>,
      );
      expect(container).toMatchSnapshot();
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
      render(
        <MemoryRouter>
          <Footer initialSelected={selected} />
        </MemoryRouter>,
      );

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
      render(
        <MemoryRouter>
          <Footer initialSelected="home" />
        </MemoryRouter>,
      );

      // Then: 선택되지 않은 버튼들은 font-normal 클래스를 가져야 한다
      expect(screen.getByText('검색')).toHaveClass('font-normal');
      expect(screen.getByText('AI 추천')).toHaveClass('font-normal');
      expect(screen.getByText('My')).toHaveClass('font-normal');
    });
  });

  describe('상호작용 테스트', () => {
    test('버튼 클릭 시 폰트가 볼드로 변경된다', () => {
      // Given: Footer 컴포넌트가 렌더링되어 있을 때
      render(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>,
      );

      // When: 홈 버튼을 클릭하면
      const homeButton = screen.getByText('홈');
      fireEvent.click(homeButton.closest('button') as HTMLElement);

      // Then: 홈 버튼의 텍스트가 볼드로 변경되어야 한다
      expect(homeButton).toHaveClass('font-bold');
    });

    test('다른 버튼 클릭 시 이전 선택이 해제되고 새 버튼이 선택된다', () => {
      // Given: 홈이 선택된 상태의 Footer 컴포넌트가 렌더링되어 있을 때
      render(
        <MemoryRouter>
          <Footer initialSelected="home" />
        </MemoryRouter>,
      );

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
      render(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>,
      );

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
});
