import { useEffect } from 'react';
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

  useEffect(() => {
    const initializeConnection = async () => {
      await connectWebSocket();
      subscribe(UNREAD_TOPIC, onUnread);
      subscribe(READ_TOPIC, onRead);
    };

    initializeConnection();

    const applyToggle = (roomId: number, isUnread: boolean) => {
      queryClient.setQueriesData({ queryKey: ['myChats'], exact: false }, (old) => {
        const data = old as InfiniteData<AxiosResponse<ApiResponseList<MyChat>>> | undefined;
        if (!data?.pages) return old;
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
      });
    };

    const onUnread = (msg: Message) => {
      const { chatRoomId } = JSON.parse((msg.body || '').replace(/\0$/, ''));
      if (chatRoomId) applyToggle(chatRoomId, true);
    };
    const onRead = (msg: Message) => {
      const { chatRoomId } = JSON.parse((msg.body || '').replace(/\0$/, ''));
      if (chatRoomId) applyToggle(chatRoomId, false);
    };

    return () => {
      unsubscribe(UNREAD_TOPIC);
      unsubscribe(READ_TOPIC);
    };
  }, [connectWebSocket, subscribe, unsubscribe, queryClient]);
};

export default useChatRead;
