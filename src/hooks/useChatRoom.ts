import postCreateChatRoom from '@/apis/chat/postCreateChatRoom';
import { apiBaseUrl, getCurrentToken } from '@/apis/apiInstance';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Client, type Message, type StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import getChatRoomMessage from '@/apis/chat/getChatRoomMessage';

// STOMP 연결 설정 상수
// 재연결 시도 딜레이
const STOMP_RECONNECT_DELAY_MS = 1000 * 5;
// 하트비트 수신 딜레이(수신이 없을 때 연결 이상으로 판단)
const STOMP_HEARTBEAT_INCOMING_MS = 1000 * 4;
// 하트비트 송신 딜레이(송신이 없을 때 연결 이상으로 판단)
const STOMP_HEARTBEAT_OUTGOING_MS = 1000 * 4;

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

const subscribeTopic = (chatRoomId: number) => {
  return `/sub/${chatRoomId}/messages`;
};

const publishTopic = (chatRoomId: number) => {
  return `/pub/${chatRoomId}/messages`;
};

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

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageResponse[]>(previousMessages || []);
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);

  useEffect(() => {
    // 액세스 토큰 가져오기
    const token = getCurrentToken();
    if (!token) {
      // TODO: 액세스 토큰이 없으면 에러 바운더리 처리
      console.error('[STOMP] 액세스 토큰이 없습니다.');
      return;
    }

    // 기존 연결이 남아있다면 정리 후 진행 (중복 구독 방지)
    if (stompClientRef.current?.active) {
      try {
        subscriptionRef.current?.unsubscribe();
      } catch {
        // TODO: 구독 해제 실패 -> 에러 바운더리 처리
      }
      void stompClientRef.current.deactivate();
      stompClientRef.current = null;
    }

    // SockJS 연결
    const socket = new SockJS(webSocketUrl);
    const stompClient = new Client({
      webSocketFactory: () => socket as WebSocket,
      // 디버깅 로그 출력
      // debug: (msg: string) => console.log('[STOMP]:', msg),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        // 채팅 토픽 구독
        const callback = (message: Message) => {
          if (message.body) {
            const newMessage: MessageResponse = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        };

        subscriptionRef.current = stompClient.subscribe(subscribeTopic(chatRoom.roomId), callback);
      },
      onStompError: (e) => {
        // TODO: 연결 실패 -> 에러 바운더리 처리
        console.error('[STOMP] 연결 실패: ', e);
        stompClient.deactivate();
      },
      reconnectDelay: STOMP_RECONNECT_DELAY_MS,
      heartbeatIncoming: STOMP_HEARTBEAT_INCOMING_MS,
      heartbeatOutgoing: STOMP_HEARTBEAT_OUTGOING_MS,
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      try {
        subscriptionRef.current?.unsubscribe();
      } catch {
        try {
          subscriptionRef.current = null;
          stompClientRef.current?.deactivate();
        } catch (closeErr) {
          console.error('[STOMP] deactivate 실패', closeErr);
        }
      } finally {
        stompClientRef.current = null;
      }
    };
  }, [chatRoom.roomId]);

  // 메시지 전송
  const sendMessage = () => {
    if (!message.trim() || !stompClientRef.current || !stompClientRef.current.connected) return;

    const messageRequest: MessageRequest = {
      content: message,
    };

    stompClientRef.current.publish({
      destination: publishTopic(chatRoom.roomId),
      body: JSON.stringify(messageRequest),
    });

    setMessage('');
  };

  // 이미지 메시지 전송
  const sendImageMessage = (imageInfo: { id: number; presignedUrl: string }) => {
    if (!imageInfo || !stompClientRef.current || !stompClientRef.current.connected) return;

    const messageRequest: MessageRequest = {
      content: '사진을 보냈습니다.',
      imageInfo,
    };

    stompClientRef.current.publish({
      destination: publishTopic(chatRoom.roomId),
      body: JSON.stringify(messageRequest),
    });
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
