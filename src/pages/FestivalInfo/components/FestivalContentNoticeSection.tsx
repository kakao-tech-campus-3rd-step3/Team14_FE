import { useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFestivalNotices } from '@/apis/notice/getFestivalNotices';
import EmptyComponent from '@/components/common/EmptyComponent';
import ErrorComponent from '@/components/common/ErrorComponent';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import PickIcon from '@/components/common/PickIcon';
import { PICK_ICONS } from '@/constants/pickIcons';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useAuth } from '@/context/AuthContext';
import { ROUTE_PATH } from '@/constants/routes';
import Button from '@/components/common/Button';
import useNav from '@/hooks/useNav';
import { generatePath } from 'react-router-dom';

interface FestivalContentNoticeSectionProps {
  festivalId: string;
  managerId: number | null;
}
/**
 * 공지사항 섹션
 * 공지사항을 표시해주는 섹션입니다. 공지사항이 없을 때는 빈 컴포넌트를 표시해줍니다.
 * 공지사항을 클릭하면 공지사항 상세 페이지로 이동합니다.
 * 축제 정보의 managerId와 현재 로그인한 사용자의 userId를 비교하여 관리자인지 확인합니다.
 * 관리자인 경우 공지사항 작성 버튼을 표시해줍니다.
 * 관리자가 아닌 경우 공지사항 작성 버튼을 표시하지 않습니다.
 * @param festivalId - 축제 ID
 * @param managerId - 관리자 ID
 * @returns 공지사항 섹션
 */
const FestivalContentNoticeSection = ({
  festivalId,
  managerId,
}: FestivalContentNoticeSectionProps) => {
  const { userInfo } = useAuth();
  const isCurrentUserManager = userInfo?.userId === managerId;
  const { goTo } = useNav();

  const handleCreateNotice = () => {
    goTo(generatePath(ROUTE_PATH.FESTIVAL_NOTICE_CREATE, { festivalId: festivalId.toString() }));
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: ['festival-notices', festivalId, managerId],
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
      <div className="w-full h-full flex flex-col gap-2">
        {notices.map((notice) => (
          <div key={notice.id} className="w-full h-full flex flex-col gap-2">
            <p className="font-medium text-gray-900">{notice.title}</p>
          </div>
        ))}
        {isFetchingNextPage && <div>Loading more...</div>}
        <div ref={observerRef} />
      </div>
    </div>
  );
};

export default FestivalContentNoticeSection;
