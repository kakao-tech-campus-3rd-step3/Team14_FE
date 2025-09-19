import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PickPage from '@/pages/Pick/PickPage';

// 테스트용 래퍼 컴포넌트
const TestWrapper = ({ initialEntries = ['/pick'] }: { initialEntries?: string[] }) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <PickPage />
    </MemoryRouter>
  );
};

describe('PickPage 테스트', () => {
  describe('스냅샷 테스트', () => {
    test('기본 스냅샷 테스트', () => {
      const { container } = render(<TestWrapper />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('스타일 선택 화면 (쿼리 파라미터 없음)', () => {
    test('스타일 선택 안내 문구가 표시된다', () => {
      // Given: 쿼리 파라미터가 없는 상태
      // When: PickPage를 렌더링하면
      render(<TestWrapper />);

      // Then: 스타일 선택 섹션 텍스트가 보여야 한다
      expect(screen.getByText(/축제의 스타일/)).toBeInTheDocument();
      expect(screen.getByText(/선택해 주세요/)).toBeInTheDocument();
    });

    test('Footer에서 AI 추천 메뉴가 선택된 상태로 표시된다', () => {
      // Given: 쿼리 파라미터가 없는 상태
      // When: PickPage를 렌더링하면
      render(<TestWrapper />);

      // Then: Footer에서 'AI 추천' 라벨이 볼드 처리되어야 한다
      const aiLabel = screen.getByText('AI 추천');
      expect(aiLabel).toHaveClass('font-bold');
    });

    test('MBTI 관련 콘텐츠는 표시되지 않는다', () => {
      // Given: 쿼리 파라미터가 없는 상태
      // When: PickPage를 렌더링하면
      render(<TestWrapper />);

      // Then: MBTI 관련 텍스트는 보이지 않아야 한다
      expect(screen.queryByText(/여행 MBTI/)).not.toBeInTheDocument();
      expect(screen.queryByPlaceholderText('캠핑, 불멍, 서핑')).not.toBeInTheDocument();
    });
  });

  describe('MBTI 선택 화면 (유효한 style 파라미터)', () => {
    test('유효한 style 파라미터가 있으면 MBTI 선택 화면이 표시된다', () => {
      // Given: 유효한 style 파라미터가 있는 상태
      // When: PickPage를 렌더링하면
      render(<TestWrapper initialEntries={['/pick?style=tradition']} />);

      // Then: MBTI 섹션 텍스트가 보여야 한다
      expect(screen.getByText(/여행 MBTI/)).toBeInTheDocument();
      expect(screen.getByText(/선택해 주세요/)).toBeInTheDocument();
    });

    test('추가 정보 입력 필드와 버튼이 표시된다', () => {
      // Given: 유효한 style 파라미터가 있는 상태
      // When: PickPage를 렌더링하면
      render(<TestWrapper initialEntries={['/pick?style=art']} />);

      // Then: 입력 필드와 추천 받기 버튼이 보여야 한다
      expect(screen.getByPlaceholderText('캠핑, 불멍, 서핑')).toBeInTheDocument();
      expect(screen.getByText('추천 받기')).toBeInTheDocument();
    });

    test('스타일 선택 관련 콘텐츠는 표시되지 않는다', () => {
      // Given: 유효한 style 파라미터가 있는 상태
      // When: PickPage를 렌더링하면
      render(<TestWrapper initialEntries={['/pick?style=food']} />);

      // Then: 스타일 선택 텍스트는 보이지 않아야 한다
      expect(screen.queryByText(/축제의 스타일/)).not.toBeInTheDocument();
    });
  });

  describe('잘못된 style 쿼리 파라미터 처리', () => {
    test('허용되지 않은 style 값이면 스타일 선택 화면을 보여준다', () => {
      // Given: 잘못된 style 파라미터가 있는 상태
      // When: PickPage를 렌더링하면
      render(<TestWrapper initialEntries={['/pick?style=invalid']} />);

      // Then: 스타일 선택 안내 문구가 나타나고 MBTI 문구는 없어야 한다
      expect(screen.getByText(/축제의 스타일/)).toBeInTheDocument();
      expect(screen.queryByText(/여행 MBTI/)).not.toBeInTheDocument();
    });

    test('빈 문자열 style 파라미터도 스타일 선택 화면을 보여준다', () => {
      // Given: 빈 style 파라미터가 있는 상태
      // When: PickPage를 렌더링하면
      render(<TestWrapper initialEntries={['/pick?style=']} />);

      // Then: 스타일 선택 화면이 표시되어야 한다
      expect(screen.getByText(/축제의 스타일/)).toBeInTheDocument();
      expect(screen.queryByText(/여행 MBTI/)).not.toBeInTheDocument();
    });

    test('숫자 style 파라미터도 잘못된 값으로 처리된다', () => {
      // Given: 숫자 style 파라미터가 있는 상태
      // When: PickPage를 렌더링하면
      render(<TestWrapper initialEntries={['/pick?style=123']} />);

      // Then: 스타일 선택 화면이 표시되어야 한다
      expect(screen.getByText(/축제의 스타일/)).toBeInTheDocument();
      expect(screen.queryByText(/여행 MBTI/)).not.toBeInTheDocument();
    });
  });
});
