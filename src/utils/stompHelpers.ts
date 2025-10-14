import { Client, type Message, type StompSubscription } from '@stomp/stompjs';
import type { IFrame } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type { MessageResponse } from '@/hooks/useChatRoom';

// STOMP 연결 설정 상수
export const STOMP_CONFIG = {
  // 재연결 시도 딜레이
  RECONNECT_DELAY_MS: 1000 * 5,
  // 하트비트 수신 딜레이(수신이 없을 때 연결 이상으로 판단)
  HEARTBEAT_INCOMING_MS: 1000 * 15,
  // 하트비트 송신 딜레이(송신이 없을 때 연결 이상으로 판단)
  HEARTBEAT_OUTGOING_MS: 1000 * 15,
} as const;

const subscribeTopic = (chatRoomId: number) => {
  return `/sub/${chatRoomId}/messages`;
};

const publishTopic = (chatRoomId: number) => {
  return `/pub/${chatRoomId}/messages`;
};

export interface StompConnectionParams {
  webSocketUrl: string;
  token: string;
  chatRoomId: number;
  onMessageReceived: (message: MessageResponse) => void;
  onError: (error: IFrame) => void;
}

export interface StompConnection {
  client: Client;
  subscription: StompSubscription;
}

/**
 * STOMP 클라이언트를 생성하고 연결합니다.
 */
export const createStompConnection = ({
  webSocketUrl,
  token,
  chatRoomId,
  onMessageReceived,
  onError,
}: StompConnectionParams): Promise<StompConnection> => {
  return new Promise((resolve, reject) => {
    const socket = new SockJS(webSocketUrl);
    const stompClient = new Client({
      webSocketFactory: () => socket as WebSocket,
      // 디버깅 로그 출력
      // debug: (msg: string) => console.log('[STOMP]:', msg),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        try {
          // 채팅 토픽 구독
          const callback = (message: Message) => {
            if (!message.body) return;
            const newMessage: MessageResponse = JSON.parse(message.body);
            onMessageReceived(newMessage);
          };

          const subscription = stompClient.subscribe(subscribeTopic(chatRoomId), callback,{
            id: `sub-${chatRoomId}`,
            ack: 'auto',
        });

          resolve({ client: stompClient, subscription });
        } catch (error) {
          reject(error);
        }
      },
      onStompError: (error) => {
        onError(error);
        stompClient.deactivate();
        reject(error);
      },
      reconnectDelay: STOMP_CONFIG.RECONNECT_DELAY_MS,
      heartbeatIncoming: STOMP_CONFIG.HEARTBEAT_INCOMING_MS,
      heartbeatOutgoing: STOMP_CONFIG.HEARTBEAT_OUTGOING_MS,
    });

    stompClient.activate();
  });
};

/**
 * STOMP 연결을 정리합니다.
 */
export const cleanupStompConnection = (
  client: Client | null,
  subscription: StompSubscription | null,
): void => {
  try {
    subscription?.unsubscribe();
  } catch (error) {
    console.warn('[STOMP] 구독 해제 중 오류:', error);
  }

  try {
    if (client && client.connected) {
      client.deactivate();
    }
  } catch (error) {
    console.error('[STOMP] 연결 해제 중 오류:', error);
  }
};

/**
 * 메시지를 발행합니다.
 */
export const publishMessage = (client: Client, chatRoomId: number, messageBody: string): void => {
  if (!client || !client.connected) {
    console.warn('[STOMP] 연결되지 않은 상태에서 메시지 발행 시도');
    return;
  }

  client.publish({
    destination: publishTopic(chatRoomId),
    body: messageBody,
  });
};
