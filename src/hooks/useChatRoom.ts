import postCreateChatRoom from '@/apis/chat/postCreateChatRoom';
import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';
import getChatRoomMessage from '@/apis/chat/getChatRoomMessage';
import { useWebSocket } from '@/context/WebSocketContext';
import { showToastErrorMessage } from '@/utils/showToastMessage';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';

const EMPTY_MESSAGE: MessageResponse = {
  id: 0,
  userId: 0,
  senderName: 'Pick',
  profileImgUrl: '/logo.svg',
  content: '채팅방에 처음 오신 것을 환영합니다!\n하단의 입력창을 통해 채팅을 시작해보세요.',
  imageUrl: '',
};

const INITIAL_CHAT_ROOM_MESSAGE_SIZE = 20;

export const subscribeTopic = (chatRoomId: number) => {
  return `/sub/${chatRoomId}/messages`;
};

export const publishTopic = (chatRoomId: number) => {
  return `/pub/${chatRoomId}/messages`;
};

export interface MessageRequest {
  content: string;
  imageInfo?: {
    id: number;
    presignedUrl: string;
  };
}

export interface MessageResponse {
  id: number;
  userId: number;
  senderName: string;
  profileImgUrl: string;
  content: string;
  imageUrl: string;
}

/**
 * 채팅방 사용 훅
 * 채팅방 생성, 채팅방 메시지 조회, STOMP 연결, 메시지 전송, 이미지 메시지 전송, 메시지 변경 이벤트 핸들러, 키 누르기 이벤트 핸들러를 포함합니다.
 * 단일 STOMP 연결, 단일 구독을 보장하기 위해 하나의 페이지에서 하나의 훅으로 사용하는 것을 권장합니다.
 * @returns {Object}
 * - chatRoom: 채팅방 정보
 * - sendMessage: 메시지 전송 함수
 * - sendImageMessage: 이미지 메시지 전송 함수
 * - messages: 메시지 목록
 * - message: 메시지 입력 필드
 * - handleMessageChange: 메시지 변경 이벤트 핸들러
 * - handleKeyPress: 키 누르기 이벤트 핸들러
 * - loader: 로더 컴포넌트로 페이지네이션에서 다음 페이지를 호출하는 영역
 */
const useChatRoom = () => {
  const { festivalId } = useParams();
  const { data: chatRoom } = useSuspenseQuery({
    queryKey: ['chatRoom', festivalId],
    queryFn: () => postCreateChatRoom({ festivalId: festivalId || '' }),
    select: (data) => data.data.content,
  });

  const {
    data: previousMessages,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['chatRoomMessages', chatRoom.roomId],
    queryFn: ({ pageParam }) =>
      getChatRoomMessage({
        chatRoomId: chatRoom.roomId.toString(),
        cursor: pageParam,
        size: INITIAL_CHAT_ROOM_MESSAGE_SIZE,
      }),
    getNextPageParam: (lastPage) => (lastPage.data.hasMoreList ? lastPage.data.cursor : undefined),
    initialPageParam: 0,
    staleTime: 0,
    gcTime: 0,
  });

  // 페이지네이션된 메시지들을 올바른 순서로 정렬
  const allMessages = useMemo(() => {
    return previousMessages?.pages.flatMap((page) => page.data.content).reverse() ?? [];
  }, [previousMessages?.pages]);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const { clientRef, connectWebSocket, subscribe, send, unsubscribe, disconnect } = useWebSocket();
  // 페이지네이션으로 불러온 메시지들을 messages 상태에 동기화
  useEffect(() => {
    const initialMessages = allMessages.length === 0 ? [EMPTY_MESSAGE] : allMessages;
    setMessages(initialMessages);
  }, [allMessages]);

  useEffect(() => {
    const initializeConnection = async () => {
      await connectWebSocket();
      subscribe(subscribeTopic(chatRoom.roomId), (message) => {
        const newMessage: MessageResponse = JSON.parse(message.body || '');
        setMessages((prevMessages) =>
          prevMessages.some((msg) => msg.id === newMessage.id)
            ? prevMessages
            : [...prevMessages, newMessage],
        );
      });
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        void disconnect();
      } else {
        location.reload();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    void initializeConnection();
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      unsubscribe(subscribeTopic(chatRoom.roomId));
    };
  }, [unsubscribe, chatRoom.roomId, connectWebSocket, subscribe, disconnect]);

  // 메시지 전송
  const sendMessage = useCallback(() => {
    if (!message.trim()) return;
    if (message.length > MAX_MESSAGE_LENGTH) {
      showToastErrorMessage(SYSTEM_MESSAGES.CHAT.MAX_MESSAGE_LENGTH);
      return;
    }

    const messageRequest: MessageRequest = {
      content: message,
    };

    send(publishTopic(chatRoom.roomId), JSON.stringify(messageRequest));
    setMessage('');
  }, [message, send, chatRoom.roomId]);

  // 이미지 메시지 전송
  const sendImageMessage = useCallback(
    (imageInfo: { id: number; presignedUrl: string }) => {
      if (!imageInfo || !clientRef.current || !clientRef.current.connected) return;

      const messageRequest: MessageRequest = {
        content: '사진을 보냈습니다.',
        imageInfo,
      };

      send(publishTopic(chatRoom.roomId), JSON.stringify(messageRequest));
    },
    [clientRef, send, chatRoom.roomId],
  );
  // 채팅 글자수를 255자로 제한
  const MAX_MESSAGE_LENGTH = 255;

  // 메세지 변경 이벤트 핸들러
  /**
   * 255자 이상 입력시 상태가 변하지 않게 하여서 그 이상의 입력을 제한하였습니다.
   * 또한 혹시 모를 에러를 대비해서 만약에 토스트 메시지를 표시하는 것을 추가하였습니다.(그치만 입력 자체를 안받기 때문에 무관할 것 같습니다.)
   * 또한 textarea의 maxLength 속성을 사용하여서 그 이상의 입력을 제한하였습니다.
   * @param e - 메시지 변경 이벤트
   * @returns void
   */
  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setMessage(value);
    }
  }, []);

  // 키 누르기 이벤트 핸들러
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== 'Enter') return;
      // IME 조합 중이거나 키 반복이면 무시
      if (e.nativeEvent.isComposing) return;
      if (e.repeat) return;
      e.preventDefault();
      sendMessage();
    },
    [sendMessage],
  );

  return {
    chatRoom,
    sendMessage,
    sendImageMessage,
    messages,
    message,
    handleMessageChange,
    handleKeyPress,
    fetchNextPage,
    hasNextPage,
    isFetching,
  };
};

export default useChatRoom;
