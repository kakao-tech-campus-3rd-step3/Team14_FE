// 모듈 목킹은 import 이전에 선언 (hoisted)
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(() => ({ festivalId: '225' })),
  };
});

vi.mock('@/apis/festivals/getFestivalInfo', async () => {
  const { festivalInfoMockData } = await import('@/mocks/data/festivalInfo.mock');
  return {
    __esModule: true,
    default: vi.fn().mockResolvedValue({ data: festivalInfoMockData }),
  };
});

vi.mock('@/apis/review/getReview', async () => {
  const { reviewMockData } = await import('@/mocks/data/review.mock');
  return {
    __esModule: true,
    default: vi.fn().mockResolvedValue({ data: reviewMockData }),
  };
});

import { render, screen, fireEvent } from '@testing-library/react';
import FestivalInfoPage from '@/pages/FestivalInfo/FestivalInfoPage';
import { ROUTE_PATH } from '@/constants/routes';
import FestivalPoster from '@/pages/FestivalInfo/components/FestivalPoster';
import { festivalInfoMockData } from '@/mocks/data/festivalInfo.mock';
import { waitFor } from '@testing-library/react';
import { reviewMockData } from '@/mocks/data/review.mock';
import TestWrapper from '@/__tests__/TestWrapper';

const initialEntries = [ROUTE_PATH.FESTIVAL_INFO.replace(':festivalId', '225')];

describe('FestivalInfoPage 테스트', () => {
  describe('스냅샷 테스트', () => {
    test('로딩 상태 스냅샷', () => {
      // Given: 페이지 최초 진입
      const { container } = render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalInfoPage />
        </TestWrapper>,
      );

      // When: 쿼리가 아직 진행 중일 때
      expect(screen.getByText('축제 정보를 불러오는 중')).toBeInTheDocument();

      // Then: 로딩 UI 스냅샷을 남긴다
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('기본 렌더링(api 호출 성공)', () => {
    test('축제 타이틀과 포스터 섹션이 표시된다', async () => {
      // Given: 유효한 festivalId로 페이지 진입
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalInfoPage />
        </TestWrapper>,
      );

      // When: 페이지가 렌더링되고 데이터가 로드되면
      const title = await screen.findByText('가평 양떼목장 수국축제');
      // Then: 타이틀이 화면에 보여야 한다
      expect(title).toBeInTheDocument();
    });
  });

  test('상세정보 섹션 제목이 표시된다', async () => {
    // Given: 페이지가 렌더링된 상태
    render(
      <TestWrapper initialEntries={initialEntries}>
        <FestivalInfoPage />
      </TestWrapper>,
    );

    // When: 데이터 로드가 완료되면
    const overviewHeading = await screen.findByText('상세정보');
    // Then: 상세정보 제목이 보여야 한다
    expect(overviewHeading).toBeInTheDocument();
  });

  test('푸터 버튼들이 표시된다', async () => {
    // Given: 페이지가 렌더링된 상태
    render(
      <TestWrapper initialEntries={initialEntries}>
        <FestivalInfoPage />
      </TestWrapper>,
    );

    // When: 데이터 로드가 완료되면
    await screen.findByText('가평 양떼목장 수국축제');

    // Then: 푸터의 두 버튼이 보여야 한다
    expect(screen.getByText('리뷰하기')).toBeInTheDocument();
    expect(screen.getByText('채팅 참여하기')).toBeInTheDocument();
  });
});

describe('상세정보 더보기/접기 상호작용', () => {
  test('더보기 버튼을 클릭하면 내용이 펼쳐지고, 접기 버튼으로 돌아간다', async () => {
    // Given: 긴 상세정보가 존재하는 축제 상세 페이지
    render(
      <TestWrapper initialEntries={initialEntries}>
        <FestivalInfoPage />
      </TestWrapper>,
    );

    // When: 데이터가 로드되어 더보기 버튼이 나타나면
    const moreButton = await screen.findByRole('button', { name: '더보기' });

    // Then: 축약된 텍스트(말줄임표 ...)가 보인다
    expect(screen.getByText(/수국밭 속 양떼목장에서는 동물들에게 먹\.\.\.$/)).toBeInTheDocument();

    // When: 더보기 버튼을 클릭하면
    fireEvent.click(moreButton);

    // Then: 접기 버튼으로 변경되고, 말줄임표가 사라진다
    expect(await screen.findByRole('button', { name: '접기' })).toBeInTheDocument();
    expect(
      screen.queryByText(/수국밭 속 양떼목장에서는 동물들에게 먹\.\.\.$/),
    ).not.toBeInTheDocument();

    // When: 접기 버튼을 다시 클릭하면
    fireEvent.click(screen.getByRole('button', { name: '접기' }));

    // Then: 더보기 버튼으로 돌아가고, 말줄임표가 다시 보인다
    expect(await screen.findByRole('button', { name: '더보기' })).toBeInTheDocument();
    expect(screen.getByText(/수국밭 속 양떼목장에서는 동물들에게 먹\.\.\.$/)).toBeInTheDocument();
  });
});

describe('FestivalPoster 컴포넌트', () => {
  const mockProps = {
    posterUrl: festivalInfoMockData.content.posterInfo,
    imageUrls: festivalInfoMockData.content.imageInfos,
    title: festivalInfoMockData.content.title,
  };

  const singleImageProps = {
    posterUrl: festivalInfoMockData.content.posterInfo,
    imageUrls: [],
    title: '단일 이미지 축제',
  };

  describe('스냅샷 테스트', () => {
    // 메인 포스터가 보이는지 확인 스냅샷
    test('메인 포스터 이미지 스냅샷', () => {
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalPoster {...mockProps} />
        </TestWrapper>,
      );
      // 메인 포스터 이미지만 스냅샷
      const posterImage = screen.getAllByRole('img')[0]; // 첫 번째 이미지가 메인 포스터
      expect(posterImage).toMatchSnapshot('main-poster-image');
    });

    // 버튼 스냅샷
    test('네비게이션 버튼 스냅샷', () => {
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalPoster {...mockProps} />
        </TestWrapper>,
      );

      // 다음 버튼으로 이동해서 이전/다음 버튼 모두 표시
      fireEvent.click(screen.getByLabelText('다음 이미지'));

      // 이전 버튼 스냅샷
      const prevButton = screen.getByLabelText('이전 이미지');
      expect(prevButton).toMatchSnapshot('prev-button');

      // 다음 버튼 스냅샷
      const nextButton = screen.getByLabelText('다음 이미지');
      expect(nextButton).toMatchSnapshot('next-button');
    });

    // 인디케이터 스냅샷
    test('인디케이터 영역 스냅샷', () => {
      const manyImagesProps = {
        ...mockProps,
        imageUrls: [
          'https://example.com/image1.jpg',
          'https://example.com/image2.jpg',
          'https://example.com/image3.jpg',
          'https://example.com/image4.jpg',
        ],
      };
      const { container } = render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalPoster {...manyImagesProps} />
        </TestWrapper>,
      );

      // 인디케이터 컨테이너 스냅샷
      const indicatorContainer = container.querySelector('.flex.justify-center.mt-4');
      expect(indicatorContainer).toMatchSnapshot('indicator-container');
    });
  });

  describe('조건부 렌더링', () => {
    test('단일 이미지일 때 화살표 버튼과 인디케이터가 표시되지 않는다', () => {
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalPoster {...singleImageProps} />
        </TestWrapper>,
      );

      // 화살표 버튼 없음
      expect(screen.queryByLabelText('이전 이미지')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('다음 이미지')).not.toBeInTheDocument();

      // 인디케이터 없음
      const indicators = screen
        .queryAllByRole('button')
        .filter((button) => !button.getAttribute('aria-label'));
      expect(indicators).toHaveLength(0);
    });

    test('여러 이미지가 있을 때 화살표 버튼과 인디케이터가 표시된다', () => {
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalPoster {...mockProps} />
        </TestWrapper>,
      );

      // 첫 번째 이미지에서는 다음 버튼만 표시
      expect(screen.queryByLabelText('이전 이미지')).not.toBeInTheDocument();
      expect(screen.getByLabelText('다음 이미지')).toBeInTheDocument();

      // 6개의 인디케이터 표시 (포스터 + 5개 추가 이미지)
      const indicators = screen
        .getAllByRole('button')
        .filter((button) => !button.getAttribute('aria-label'));
      expect(indicators).toHaveLength(6);
    });
  });

  describe('화살표 버튼 상호작용', () => {
    test('다음 버튼 클릭 시 이미지가 변경되고 이전 버튼이 나타난다', () => {
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalPoster {...mockProps} />
        </TestWrapper>,
      );

      // 초기 상태: 다음 버튼만 있음
      expect(screen.queryByLabelText('이전 이미지')).not.toBeInTheDocument();
      expect(screen.getByLabelText('다음 이미지')).toBeInTheDocument();

      // 다음 버튼 클릭
      const nextButton = screen.getByLabelText('다음 이미지');
      fireEvent.click(nextButton);

      // 이미지 변경 후: 이전 버튼이 나타남
      expect(screen.getByLabelText('이전 이미지')).toBeInTheDocument();
      expect(screen.getByLabelText('다음 이미지')).toBeInTheDocument();
    });

    test('이전 버튼 클릭 시 첫 번째 이미지로 돌아가고 이전 버튼이 사라진다', () => {
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalPoster {...mockProps} />
        </TestWrapper>,
      );

      // 먼저 다음 이미지로 이동
      fireEvent.click(screen.getByLabelText('다음 이미지'));

      // 이전 버튼이 나타났는지 확인
      expect(screen.getByLabelText('이전 이미지')).toBeInTheDocument();

      // 이전 버튼 클릭
      const prevButton = screen.getByLabelText('이전 이미지');
      fireEvent.click(prevButton);

      // 첫 번째 이미지로 돌아감: 이전 버튼 사라짐
      expect(screen.queryByLabelText('이전 이미지')).not.toBeInTheDocument();
      expect(screen.getByLabelText('다음 이미지')).toBeInTheDocument();
    });

    test('마지막 이미지에서 다음 버튼이 사라진다', () => {
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalPoster {...mockProps} />
        </TestWrapper>,
      );

      // 마지막 이미지까지 이동 (총 6개 이미지)
      for (let i = 0; i < 5; i++) {
        fireEvent.click(screen.getByLabelText('다음 이미지'));
      }

      // 마지막 이미지: 다음 버튼 사라짐, 이전 버튼만 있음
      expect(screen.queryByLabelText('다음 이미지')).not.toBeInTheDocument();
      expect(screen.getByLabelText('이전 이미지')).toBeInTheDocument();
    });

    test('연속 클릭으로 처음과 마지막 이미지를 확인할 수 있다', () => {
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalPoster {...mockProps} />
        </TestWrapper>,
      );

      // 1번째 → 2번째 이미지
      fireEvent.click(screen.getByLabelText('다음 이미지'));
      expect(screen.getByLabelText('이전 이미지')).toBeInTheDocument();
      expect(screen.getByLabelText('다음 이미지')).toBeInTheDocument();

      // 마지막 이미지까지 이동
      for (let i = 0; i < 4; i++) {
        fireEvent.click(screen.getByLabelText('다음 이미지'));
      }
      expect(screen.getByLabelText('이전 이미지')).toBeInTheDocument();
      expect(screen.queryByLabelText('다음 이미지')).not.toBeInTheDocument();

      // 마지막 → 첫 번째 이미지로 돌아가기
      for (let i = 0; i < 5; i++) {
        fireEvent.click(screen.getByLabelText('이전 이미지'));
      }
      expect(screen.queryByLabelText('이전 이미지')).not.toBeInTheDocument();
      expect(screen.getByLabelText('다음 이미지')).toBeInTheDocument();
    });
  });

  describe('인디케이터 상호작용', () => {
    test('인디케이터 클릭 시 해당 이미지로 이동한다', () => {
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalPoster {...mockProps} />
        </TestWrapper>,
      );

      const indicators = screen
        .getAllByRole('button')
        .filter((button) => !button.getAttribute('aria-label'));

      // 마지막 인디케이터 클릭 (마지막 이미지)
      fireEvent.click(indicators[5]);

      // 이전 버튼만 표시되어야 함
      expect(screen.getByLabelText('이전 이미지')).toBeInTheDocument();
      expect(screen.queryByLabelText('다음 이미지')).not.toBeInTheDocument();
    });

    test('현재 활성 인디케이터가 올바른 스타일을 가진다', () => {
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalPoster {...mockProps} />
        </TestWrapper>,
      );

      const indicators = screen
        .getAllByRole('button')
        .filter((button) => !button.getAttribute('aria-label'));

      // 첫 번째 인디케이터가 활성 상태여야 함
      expect(indicators[0]).toHaveClass('bg-primary-300');
      // 나머지 인디케이터들은 비활성 상태
      for (let i = 1; i < indicators.length; i++) {
        expect(indicators[i]).toHaveClass('bg-gray-300');
      }
    });
  });

  describe('터치 스와이프 기능', () => {
    test('충분한 거리 스와이프 시 이미지가 변경된다', async () => {
      const { container } = render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalPoster {...mockProps} />
        </TestWrapper>,
      );
      const posterContainer = container.querySelector('.h-\\[500px\\]');

      // 왼쪽으로 스와이프 (다음 이미지로)
      fireEvent.touchStart(posterContainer!, {
        touches: [{ clientX: 200 }],
      });
      fireEvent.touchMove(posterContainer!, {
        touches: [{ clientX: 100 }],
      });
      fireEvent.touchEnd(posterContainer!);

      // 이미지 변경 확인
      await waitFor(() => {
        expect(screen.getByLabelText('이전 이미지')).toBeInTheDocument();
      });
    });

    test('임계값 미만 스와이프 시 이미지가 변경되지 않는다', () => {
      const { container } = render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalPoster {...mockProps} />
        </TestWrapper>,
      );
      const posterContainer = container.querySelector('.h-\\[500px\\]');

      // 작은 거리 스와이프
      fireEvent.touchStart(posterContainer!, {
        touches: [{ clientX: 100 }],
      });
      fireEvent.touchMove(posterContainer!, {
        touches: [{ clientX: 80 }],
      });
      fireEvent.touchEnd(posterContainer!);

      // 이미지 변경되지 않음 확인
      expect(screen.queryByLabelText('이전 이미지')).not.toBeInTheDocument();
      expect(screen.getByLabelText('다음 이미지')).toBeInTheDocument();
    });
  });

  describe('접근성 및 스타일링', () => {
    test('이미지와 버튼이 적절한 접근성 속성을 가진다', () => {
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalPoster {...mockProps} />
        </TestWrapper>,
      );

      // 이미지 alt 텍스트 확인
      const images = screen.getAllByRole('img');
      images.forEach((img, index) => {
        expect(img).toHaveAttribute('alt', `${mockProps.title} - ${index + 1}`);
        expect(img).toHaveAttribute('draggable', 'false');
      });

      // 네비게이션 버튼 aria-label 확인
      expect(screen.getByLabelText('다음 이미지')).toBeInTheDocument();
    });

    test('화살표 버튼이 데스크톱에서만 표시되는 클래스를 가진다', () => {
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalPoster {...mockProps} />
        </TestWrapper>,
      );

      // 다음 버튼으로 이동해서 이전 버튼도 표시되게 함
      fireEvent.click(screen.getByLabelText('다음 이미지'));

      const prevButton = screen.getByLabelText('이전 이미지');
      const nextButton = screen.getByLabelText('다음 이미지');

      expect(prevButton).toHaveClass('hidden', 'md:flex');
      expect(nextButton).toHaveClass('hidden', 'md:flex');
    });
  });
});

describe('리뷰 섹션 컴포넌트', () => {
  describe('기본 렌더링', () => {
    test('리뷰 섹션 스냅샷', async () => {
      // Given: 축제 상세 페이지 렌더링
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalInfoPage />
        </TestWrapper>,
      );

      // When: 데이터가 로드될 때까지 대기
      await screen.findByText('가평 양떼목장 수국축제');

      // Then: 리뷰 섹션 스냅샷
      await waitFor(() => {
        const reviewSection = screen.queryByText(/리뷰 \(\d+\)/)?.closest('section');
        expect(reviewSection).toMatchSnapshot('review-section');
      });
    });

    test('첫 번째 리뷰 카드 구성 요소별 스냅샷', async () => {
      // Given: 축제 상세 페이지 렌더링
      render(
        <TestWrapper initialEntries={initialEntries}>
          <FestivalInfoPage />
        </TestWrapper>,
      );

      // When: 데이터가 로드될 때까지 대기
      await screen.findByText('가평 양떼목장 수국축제');

      // Then: 첫 번째 리뷰 카드의 각 구성요소별 스냅샷
      await waitFor(() => {
        const firstReviewer = reviewMockData.content[0].reviewerName; // '홍길동'
        const firstReviewCard = screen.queryByText(firstReviewer)?.closest('div')?.parentElement;

        if (firstReviewCard) {
          // 리뷰어 이름만 스냅샷
          const reviewerName = screen.queryByText(firstReviewer);
          expect(reviewerName).toMatchSnapshot('first-review-reviewer-name');

          // 별점만 스냅샷 (StarRating 컴포넌트)
          const starRating =
            firstReviewCard.querySelector('[class*="star"], [role="img"]') ||
            firstReviewCard.querySelector('svg');
          expect(starRating).toMatchSnapshot('first-review-star-rating');

          // 첫 번째 이미지만 스냅샷
          const firstImage = firstReviewCard.querySelector('img');
          expect(firstImage).toMatchSnapshot('first-review-first-image');

          // 리뷰 내용 텍스트 스냅샷
          const contentElement = screen.queryByText(reviewMockData.content[0].content); // '꽃이 예뻐요.'
          expect(contentElement).toMatchSnapshot('first-review-content');
        }
      });
    });
  });

  test('리뷰 섹션이 로드되고 첫 리뷰의 작성자와 별점이 보인다', async () => {
    // Given: 축제 상세 페이지 렌더링
    render(
      <TestWrapper initialEntries={initialEntries}>
        <FestivalInfoPage />
      </TestWrapper>,
    );

    // When: 데이터가 로드될 때까지 대기
    await screen.findByText('가평 양떼목장 수국축제');

    // Then: 리뷰 섹션 헤더와 첫 리뷰 작성자 노출
    expect(screen.getByText(/리뷰 \(\d+\)/)).toBeInTheDocument();
    const firstReviewer = reviewMockData.content[0].reviewerName;
    expect(screen.getByText(firstReviewer)).toBeInTheDocument();
  });

  test('이미지 리뷰 썸네일 클릭 시 모달이 열리고 카운터가 표시된다 (이미지 전용)', async () => {
    // Given: 페이지 렌더링 및 데이터 로드
    render(
      <TestWrapper initialEntries={initialEntries}>
        <FestivalInfoPage />
      </TestWrapper>,
    );
    await screen.findByText('가평 양떼목장 수국축제');

    // When: 첫 번째 리뷰 카드 내의 첫 이미지 썸네일을 클릭
    const firstReviewer = reviewMockData.content[0].reviewerName;
    const reviewer = screen.getByText(firstReviewer);
    const reviewCard = reviewer.closest('div')?.parentElement; // 카드 컨테이너

    // 리뷰 미디어 슬라이더 내의 이미지를 찾기
    const mediaSlider = reviewCard?.querySelector('[class*="overflow-x-scroll"]');
    const firstImage = mediaSlider?.querySelector('img');

    expect(firstImage).toBeTruthy();
    if (firstImage) {
      fireEvent.click(firstImage);
    }

    // Then: 모달이 열리고 모달 닫기 버튼, 미디어 카운터, 다음 화살표가 보인다
    await waitFor(
      () => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    expect(await screen.findByRole('button', { name: '모달 닫기' })).toBeInTheDocument();
    expect(screen.getByText(/\d+ \/ \d+/)).toBeInTheDocument();
    expect(screen.getByLabelText('다음 미디어')).toBeInTheDocument();

    // And: 다음으로 이동하면 카운터가 증가한다
    fireEvent.click(screen.getByLabelText('다음 미디어'));
    expect(screen.getByText(/2 \/ \d+/)).toBeInTheDocument();

    // And: 모달을 닫을 수 있다
    fireEvent.click(screen.getByRole('button', { name: '모달 닫기' }));
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: '모달 닫기' })).not.toBeInTheDocument();
    });
  });

  test('비디오가 포함된 리뷰에서 비디오 썸네일 클릭 시 모달 오픈 및 화살표 표시', async () => {
    // Given: 페이지 렌더링 및 데이터 로드
    render(
      <TestWrapper initialEntries={initialEntries}>
        <FestivalInfoPage />
      </TestWrapper>,
    );
    await screen.findByText('가평 양떼목장 수국축제');

    // When: 두 번째 리뷰 카드 내의 비디오 썸네일(비디오 요소)을 클릭
    const secondReviewer = reviewMockData.content[1].reviewerName;
    const reviewer = screen.getByText(secondReviewer);
    const reviewCard = reviewer.closest('div')?.parentElement; // 카드 컨테이너
    const videoEl = reviewCard?.querySelector('video') as HTMLVideoElement | null;
    expect(videoEl).toBeTruthy();
    videoEl && fireEvent.click(videoEl);

    // Then: 모달이 열리고 화살표는 hidden md:flex 클래스를 가진다
    const nextBtn = await screen.findByLabelText('다음 미디어');
    expect(nextBtn).toHaveClass('hidden', 'md:flex');
    expect(screen.getByText(/\d+ \/ \d+/)).toBeInTheDocument();

    // And: 모달 닫기 가능
    fireEvent.click(screen.getByRole('button', { name: '모달 닫기' }));
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: '모달 닫기' })).not.toBeInTheDocument();
    });
  });
});
