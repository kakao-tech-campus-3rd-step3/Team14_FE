import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getMyWishes } from '@/apis/wish/getMyWishes';
import EmptyComponent from '@/components/common/EmptyComponent';

const MyPageWishListSection = () => {
  const { data } = useSuspenseInfiniteQuery({
    queryKey: ['myWishes'],
    queryFn: ({ pageParam = 0 }) => getMyWishes(pageParam, 5),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.last ? undefined : allPages.length;
    },
    initialPageParam: 0,
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

  return myWishes.map((wish) => (
    <div key={wish.wishId}>
      <h3>{wish.title}</h3>
    </div>
  ));
};

export default MyPageWishListSection;
