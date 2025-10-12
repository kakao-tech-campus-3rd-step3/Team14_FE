import postCreateChatRoom from '@/apis/chat/postCreateChatRoom';
import { apiBaseUrl, getCurrentToken } from '@/apis/apiInstance';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Client, type StompSubscription } from '@stomp/stompjs';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import getChatRoomMessage from '@/apis/chat/getChatRoomMessage';
import {
  createStompConnection,
  cleanupStompConnection,
  publishMessage,
} from '@/utils/stompHelpers';

const EMPTY_MESSAGE: MessageResponse = {
  id: 0,
  userId: 0,
  senderName: 'Pick',
  profileImgUrl: '/logo.svg',
  content: '채팅방에 처음 오신 것을 환영합니다! 🎉\n하단의 입력창을 통해 채팅을 시작해보세요.',
  imageUrl: '',
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

const webSocketUrl = apiBaseUrl + API_ENDPOINTS.CHAT;

const useChatRoom = () => {
  const { festivalId } = useParams();
  const { data: chatRoom } = useSuspenseQuery({
    queryKey: ['chatRoom', festivalId],
    queryFn: () => postCreateChatRoom({ festivalId: festivalId || '' }),
    select: (data) => data.data.content,
  });

  const { data: previousMessages } = useSuspenseQuery({
    queryKey: ['chatRoomMessages', chatRoom.roomId],
    queryFn: () => getChatRoomMessage({ chatRoomId: chatRoom.roomId.toString() }),
    select: (data) => data.data.content,
  });

  const initialMessages = previousMessages.length > 0 ? previousMessages : [EMPTY_MESSAGE];

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageResponse[]>(initialMessages);
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);

  useEffect(() => {
    const initializeConnection = async () => {
      // 액세스 토큰 가져오기
      const token = getCurrentToken();
      if (!token) {
        // TODO: 액세스 토큰이 없으면 에러 바운더리 처리
        console.error('[STOMP] 액세스 토큰이 없습니다.');
        return;
      }

      // 기존 연결 정리
      cleanupStompConnection(stompClientRef.current, subscriptionRef.current);
      stompClientRef.current = null;
      subscriptionRef.current = null;

      try {
        // 새 연결 생성
        const { client, subscription } = await createStompConnection({
          webSocketUrl,
          token,
          chatRoomId: chatRoom.roomId,
          onMessageReceived: (newMessage) => {
            setMessages((prevMessages) => {
              // 동일 message ID가 이미 있으면 중복 추가 방지
              if (prevMessages.some((message) => message.id === newMessage.id)) return prevMessages;
              return [...prevMessages, newMessage];
            });
          },
          onError: (error) => {
            // TODO: 연결 실패 -> 에러 바운더리 처리
            console.error('[STOMP] 연결 실패: ', error);
          },
        });

        stompClientRef.current = client;
        subscriptionRef.current = subscription;
      } catch (error) {
        console.error('[STOMP] 연결 초기화 실패:', error);
      }
    };

    void initializeConnection();

    return () => {
      cleanupStompConnection(stompClientRef.current, subscriptionRef.current);
      stompClientRef.current = null;
      subscriptionRef.current = null;
    };
  }, [chatRoom.roomId]);

  // 메시지 전송
  const sendMessage = () => {
    if (!message.trim() || !stompClientRef.current?.connected) return;

    const messageRequest: MessageRequest = {
      content: message,
    };

    publishMessage(stompClientRef.current, chatRoom.roomId, JSON.stringify(messageRequest));
    setMessage('');
  };

  // 이미지 메시지 전송
  const sendImageMessage = (imageInfo: { id: number; presignedUrl: string }) => {
    if (!imageInfo || !stompClientRef.current?.connected) return;

    const messageRequest: MessageRequest = {
      content: '사진을 보냈습니다.',
      imageInfo,
    };

    publishMessage(stompClientRef.current, chatRoom.roomId, JSON.stringify(messageRequest));
  };

  // 메세지 변경 이벤트 핸들러
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // 키 누르기 이벤트 핸들러
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter') return;
    // IME 조합 중이거나 키 반복이면 무시
    if (e.nativeEvent.isComposing) return;
    if (e.repeat) return;
    e.preventDefault();
    sendMessage();
  };

  return {
    chatRoom,
    sendMessage,
    sendImageMessage,
    messages,
    message,
    handleMessageChange,
    handleKeyPress,
  };
};

export default useChatRoom;
