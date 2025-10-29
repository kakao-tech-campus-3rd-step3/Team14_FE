import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getMyChats } from '@/apis/chat/getMyChats';
import EmptyComponent from '@/components/common/EmptyComponent';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { generatePath, Link } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';
import useChatRead from '@/hooks/useChatRead';

const MyPageChatSection = () => {
  useChatRead();
  const { data, isFetching, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['myChats'],
    queryFn: ({ pageParam = 0 }) => getMyChats(pageParam, 5),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.last ? undefined : allPages.length;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 1,
    gcTime: 0,
  });

  const { ref: observerRef } = useIntersectionObserver(() => {
    if (isFetching || !hasNextPage) return;
    fetchNextPage();
  });

  const myChats = data?.pages.flatMap((page) => page.data.content) || [];

  // "채팅방" 단어 제거 및 8글자 이상 축제명 생략 헬퍼 함수
  const formatRoomName = (roomName: string) => {
    const cleanedName = roomName.replace(/\s*채팅방\s*/g, '');
    if (cleanedName.length > 8) {
      return cleanedName.substring(0, 5) + '...';
    }
    return cleanedName;
  };

  if (myChats.length === 0) {
    return <EmptyComponent title="채팅 목록이 없습니다." description="대화를 시작해보세요!" />;
  }

  return (
    <div className="overflow-x-auto pb-2 snap-x snap-mandatory">
      <section className="flex gap-4">
        {myChats.map((chat) => (
          <Link
            to={generatePath(ROUTE_PATH.CHAT, { festivalId: chat.festivalId.toString() })}
            key={chat.roomId}
            className="flex-shrink-0 flex flex-col items-center gap-2 min-w-[80px] snap-start"
          >
            <div className="relative">
              <img
                src={chat.posterInfo}
                alt={chat.roomName}
                className="size-20 rounded-full object-cover border-2 border-gray-200"
              />
              {chat.existNewMessage && (
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-600 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                {formatRoomName(chat.roomName)}
              </h3>
            </div>
          </Link>
        ))}
        {isFetching && (
          <div className="flex-shrink-0 flex items-center justify-center min-w-12">
            <LoadingSpinner />
          </div>
        )}
        {!isFetching && hasNextPage && (
          <div ref={observerRef} className="flex-shrink-0 min-w-12 h-1" />
        )}
      </section>
    </div>
  );
};

export default MyPageChatSection;
