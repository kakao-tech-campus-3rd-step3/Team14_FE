import { getMyFestivals } from '@/apis/festivals/getMyFestivals';
import EmptyComponent from '@/components/common/EmptyComponent';
import FestivalCard from '@/pages/Festivals/components/FestivalCard';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * 내가 관리하는 축제 내용 컴포넌트
 * @returns 내가 관리하는 축제 내용 컴포넌트
 * 내가 관리하는 축제 목록을 표시합니다.
 */
const SettingsFestivalMyManageContent = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: ['my-festivals'],
    queryFn: ({ pageParam = 0 }) => getMyFestivals(pageParam, 5),
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.last) {
        return (lastPage.data.number ?? 0) + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
  });

  const festivals = data?.pages.flatMap((page) => page.data.content) ?? [];

  const { ref: observerRef } = useIntersectionObserver(() => {
    if (isLoading || !hasNextPage) return;
    fetchNextPage();
  });

  if (isLoading) {
    return <LoadingSpinner size="md" className="h-64" message="축제를 불러오는 중..." />;
  }

  if (festivals.length === 0) {
    return (
      <div className="p-4">
        <EmptyComponent title="등록한 축제가 없습니다." description="새로운 축제를 등록해보세요!" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-6 pb-20">
        {festivals.map((festival) => (
          <FestivalCard key={festival.id} data={festival} />
        ))}
      </div>

      {isFetching && <LoadingSpinner size="md" className="h-64" message="축제를 불러오는 중..." />}
      {hasNextPage && <div ref={observerRef} className="h-10" />}
    </div>
  );
};

export default SettingsFestivalMyManageContent;
