import { useCallback, useEffect } from 'react';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useWebSocket } from '@/context/WebSocketContext';
import type { Message } from '@stomp/stompjs';
import type { ApiResponseList } from '@/apis/apiResponse';
import type { MyChat } from '@/apis/chat/getMyChats';
import type { AxiosResponse } from 'axios';

const UNREAD_TOPIC = '/user/queue/unreads';
const READ_TOPIC = '/user/queue/reads';

const useChatRead = () => {
  const queryClient = useQueryClient();
  const { connectWebSocket, subscribe, unsubscribe } = useWebSocket();

  const applyToggle = useCallback(
    (roomId: number, isUnread: boolean) => {
      queryClient.setQueriesData(
        { queryKey: ['myChats'], exact: false },
        (data: InfiniteData<AxiosResponse<ApiResponseList<MyChat>>> | undefined) => {
          if (!data?.pages) return data;
          return {
            ...data,
            pages: data.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                content: page.data.content.map((room) =>
                  room.roomId === roomId ? { ...room, existNewMessage: isUnread } : room,
                ),
              },
            })),
          };
        },
      );
    },
    [queryClient],
  );

  const onUnread = useCallback(
    (msg: Message) => {
      const { chatRoomId } = JSON.parse((msg.body || '').replace(/\0$/, ''));
      if (chatRoomId) applyToggle(chatRoomId, true);
    },
    [applyToggle],
  );
  const onRead = useCallback(
    (msg: Message) => {
      const { chatRoomId } = JSON.parse((msg.body || '').replace(/\0$/, ''));
      if (chatRoomId) applyToggle(chatRoomId, false);
    },
    [applyToggle],
  );

  const initializeConnection = useCallback(async () => {
    await connectWebSocket();
    subscribe(UNREAD_TOPIC, onUnread);
    subscribe(READ_TOPIC, onRead);
  }, [connectWebSocket, subscribe, onUnread, onRead]);

  useEffect(() => {
    void initializeConnection();

    return () => {
      unsubscribe(UNREAD_TOPIC);
      unsubscribe(READ_TOPIC);
    };
  }, [initializeConnection, unsubscribe]);
};

export default useChatRead;
