import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getMyWishFestivals } from '@/apis/wish/getMyWishFestivals';
import EmptyComponent from '@/components/common/EmptyComponent';
import MyPageFestivalCard from '@/pages/My/components/MyPageFestivalCard';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const MyPageWishFestivalsSection = () => {
  const { data, isFetching, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['myWishFestivals'],
    queryFn: ({ pageParam = 0 }) => getMyWishFestivals(pageParam, 5),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.last ? undefined : allPages.length;
    },
    initialPageParam: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const { ref: observerRef } = useIntersectionObserver(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  });
  const myWishes = data?.pages.flatMap((page) => page.data.content) || [];
  if (myWishes.length === 0) {
    return (
      <EmptyComponent
        title="좋아요한 축제가 없습니다."
        description="축제를 찾아보고 좋아요를 눌러보세요!"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 px-2">
      {myWishes.map((festival) => (
        <MyPageFestivalCard key={festival.id} data={festival} />
      ))}
      {isFetching && <LoadingSpinner message="축제를 불러오는 중..." />}
      {hasNextPage && <div ref={observerRef} className="h-1" />}
    </div>
  );
};

export default MyPageWishFestivalsSection;
