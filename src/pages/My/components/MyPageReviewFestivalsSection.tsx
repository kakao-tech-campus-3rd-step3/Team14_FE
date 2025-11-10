import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getMyReviewFestivals } from '@/apis/review/getMyReviewFestivals';
import EmptyComponent from '@/components/common/EmptyComponent';
import MyPageFestivalCard from '@/pages/My/components/MyPageFestivalCard';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const MyPageReviewFestivalsSection = () => {
  const { data, isFetching, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['myReviewFestivals'],
    queryFn: ({ pageParam = 0 }) => getMyReviewFestivals(pageParam, 5),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.last ? undefined : allPages.length;
    },
    initialPageParam: 0,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const { ref: observerRef } = useIntersectionObserver(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  });
  const myReviewFestivals = data?.pages.flatMap((page) => page.data.content) || [];
  if (myReviewFestivals.length === 0) {
    return (
      <EmptyComponent
        title="리뷰한 축제가 없습니다."
        description="축제를 찾아보고 리뷰를 작성해보세요!"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 px-2">
      {myReviewFestivals.map((festival) => (
        <MyPageFestivalCard key={festival.id} data={festival} />
      ))}
      {isFetching && <LoadingSpinner message="축제를 불러오는 중..." />}
      {hasNextPage && <div ref={observerRef} className="h-1" />}
    </div>
  );
};

export default MyPageReviewFestivalsSection;
