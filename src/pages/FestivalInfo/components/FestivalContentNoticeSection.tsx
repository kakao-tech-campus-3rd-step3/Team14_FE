import { useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFestivalNotices } from '@/apis/notice/getFestivalNotices';
import EmptyComponent from '@/components/common/EmptyComponent';
import ErrorComponent from '@/components/error/ErrorComponent';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import PickIcon from '@/components/common/PickIcon';
import { PICK_ICONS } from '@/constants/pickIcons';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import Button from '@/components/common/Button';
import { useSlider } from '@/hooks/useSlider';
import LeftArrow from '@/components/icon/LeftArrowIcon';
import RightArrow from '@/components/icon/RightArrowIcon';
import { useNoticeNavigationHandlers } from '@/hooks/useNoticeNavigationHandlers';
import FestivalContentNoticeSectionCard from '@/pages/FestivalInfo/components/FestivalContentNoticeSectionCard';

interface FestivalContentNoticeSectionProps {
  festivalId: string;
  isManager: boolean;
}
/**
 * 공지사항 섹션
 * 공지사항을 표시해주는 섹션입니다. 공지사항이 없을 때는 빈 컴포넌트를 표시해줍니다.
 * 공지사항을 클릭하면 공지사항 상세 페이지로 이동합니다.
 * 축제 정보의 managerId와 현재 로그인한 사용자의 userId를 비교하여 관리자인지 확인합니다.
 * 관리자인 경우 공지사항 작성 버튼을 표시해줍니다.
 * 관리자가 아닌 경우 공지사항 작성 버튼을 표시하지 않습니다.
 * @param festivalId - 축제 ID
 * @param isManager - 관리자 여부
 * @returns 공지사항 섹션
 */
const FestivalContentNoticeSection = ({
  festivalId,
  isManager,
}: FestivalContentNoticeSectionProps) => {
  const isCurrentUserManager = isManager;

  const { handleCreateNotice, handleNoticeClick } = useNoticeNavigationHandlers(festivalId);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: ['festival-notices', festivalId],
      queryFn: ({ pageParam = 0 }) => getFestivalNotices(festivalId, pageParam, 5),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.last ? undefined : allPages.length;
      },
      initialPageParam: 0,
      select: (data) => ({
        pages: data.pages,
        pageParams: data.pageParams,
      }),
    });

  const fetchMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const { ref: observerRef } = useIntersectionObserver(() => {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchMore();
  });

  const notices = data?.pages.flatMap((page) => page.data.content) || [];

  const {
    currentIndex,
    setCurrentIndex,
    containerRef,
    goToPrevious,
    goToNext,
    canGoPrevious,
    canGoNext,
    touchHandlers,
    getTransformStyle,
  } = useSlider({ itemCount: notices.length });

  const arrowButtonClasses =
    'absolute top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200';
  // festivalId가 없으면 에러 표시
  if (!festivalId) {
    return (
      <ErrorComponent
        title="오류가 발생했습니다"
        message="Missing ':festivalId' param"
        showBackButton={true}
      />
    );
  }
  //TODO: 로딩 스피너와 에러 컴포넌트 수정 부탁드립니다!
  if (isLoading)
    return (
      <LoadingSpinner size="lg" className="min-h-[400px]" message="공지사항을 불러오는 중..." />
    );
  if (error)
    return (
      <ErrorComponent title="오류가 발생했습니다" message={error.message} showBackButton={true} />
    );

  // 공지사항이 없을 때
  if (notices.length === 0) {
    return (
      <div className="w-full h-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <PickIcon name={PICK_ICONS.NOTICE} size={20} className="mr-1" />
            <h3 className="text-sm text-gray-900 font-bold">공지사항</h3>
          </div>
          {isCurrentUserManager && (
            <Button
              variant="text"
              className="text-sm text-primary-300"
              onClick={handleCreateNotice}
            >
              공지사항 작성
            </Button>
          )}
        </div>
        <EmptyComponent
          className="w-full h-full flex flex-col gap-2"
          title=""
          description="아직 공지사항이 없습니다."
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <PickIcon name={PICK_ICONS.NOTICE} size={20} className="mr-2" />
          <h3 className="text-sm text-gray-900 font-bold">공지사항</h3>
        </div>
        {isCurrentUserManager && (
          <Button variant="text" className="text-sm text-primary-300" onClick={handleCreateNotice}>
            공지사항 작성
          </Button>
        )}
      </div>

      {/* 스와이프 가능한 공지사항 제목들 */}
      <div className="w-full relative">
        <div
          ref={containerRef}
          className="relative w-full h-[60px] overflow-hidden"
          {...touchHandlers}
        >
          <div
            className="flex transition-transform duration-300 ease-out h-full"
            style={{
              transform: getTransformStyle(),
            }}
          >
            {notices.map((notice) => (
              <div key={notice.id} className="w-full h-full flex-shrink-0 px-2">
                <FestivalContentNoticeSectionCard notice={notice} onClick={handleNoticeClick} />
              </div>
            ))}
          </div>

          {/* 화살표 버튼 (공지사항이 2개 이상일 때만) */}
          {notices.length > 1 && (
            <>
              {canGoPrevious && (
                <button
                  onClick={goToPrevious}
                  className={`${arrowButtonClasses} left-2`}
                  aria-label="이전 공지사항"
                >
                  <LeftArrow className="stroke-white w-4 h-4" />
                </button>
              )}

              {canGoNext && (
                <button
                  onClick={goToNext}
                  className={`${arrowButtonClasses} right-2`}
                  aria-label="다음 공지사항"
                >
                  <RightArrow className="stroke-white w-4 h-4" />
                </button>
              )}
            </>
          )}
        </div>

        {/* 인디케이터 (공지사항이 2개 이상일 때만) */}
        {notices.length > 1 && (
          <div className="flex justify-center mt-2 gap-1">
            {notices.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary-300' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 무한 스크롤용 */}
      {isFetchingNextPage && <LoadingSpinner size="sm" message="공지사항을 불러오는 중..." />}
      <div ref={observerRef} />
    </div>
  );
};

export default FestivalContentNoticeSection;
