import { apiBaseUrl, getCurrentToken } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import { showToastErrorMessage } from '@/utils/showToastMessage';
import { Client, type Message, type StompSubscription } from '@stomp/stompjs';
import React, { createContext, useContext, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import SockJS from 'sockjs-client';

const STOMP_URL = apiBaseUrl + API_ENDPOINTS.STOMP;

// STOMP 연결 설정 상수
export const STOMP_CONFIG = {
  // 재연결 시도 딜레이
  RECONNECT_DELAY_MS: 1000 * 5,
  // 하트비트 수신 딜레이(수신이 없을 때 연결 이상으로 판단)
  HEARTBEAT_INCOMING_MS: 1000 * 4,
  // 하트비트 송신 딜레이(송신이 없을 때 연결 이상으로 판단)
  HEARTBEAT_OUTGOING_MS: 1000 * 4,
} as const;

/**
 * WebSocketContext
 * WebSocket의 싱글톤 인스턴스
 * 연결 관리, 구독, 메시지 전송, 메시지 수신 등을 담당합니다.
 */
interface WebSocketContextType {
  clientRef: React.RefObject<Client | null>;
  subscriptionsRef: React.RefObject<StompSubscription[]>;
  connectWebSocket: () => Promise<void>;
  subscribe: (destination: string, callback: (message: Message) => void) => void;
  unsubscribe: (destination: string) => void;
  send: (destination: string, message: string) => void;
  disconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket는 반드시 WebSocketProvider 내에서 사용되어야 함');
  }
  return context;
};

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const clientRef = useRef<Client | null>(null);
  const subscriptionsRef = useRef<StompSubscription[]>([]);
  // 목적지별 단일 구독 + 핸들러 세트 + refCount 관리
  const destinationEntriesRef = useRef(
    new Map<
      string,
      {
        subscription: StompSubscription | null;
        handlers: Set<(m: Message) => void>;
        refCount: number;
      }
    >(),
  );
  const totalRefCountRef = useRef(0);

  const connectWebSocket = () => {
    if (clientRef.current && clientRef.current.connected) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          const token = await getCurrentToken();
          if (!token) throw new Error('토큰이 없습니다.');

          const socket = new SockJS(STOMP_URL);
          const stompClient = new Client({
            webSocketFactory: () => socket,
            connectHeaders: { Authorization: `Bearer ${token}` },
            reconnectDelay: STOMP_CONFIG.RECONNECT_DELAY_MS,
            heartbeatIncoming: STOMP_CONFIG.HEARTBEAT_INCOMING_MS,
            heartbeatOutgoing: STOMP_CONFIG.HEARTBEAT_OUTGOING_MS,
            debug: (msg: string) => console.log('[STOMP]:', msg),
          });

          stompClient.onConnect = () => {
            clientRef.current = stompClient;
            // 재연결 시 기존 목적지 재구독
            for (const [destination, entry] of destinationEntriesRef.current.entries()) {
              if (entry.refCount > 0) {
                entry.subscription = stompClient.subscribe(
                  destination,
                  (message) => {
                    const body = (message.body || '').replace(/\0$/, '');
                    const safe = { ...message, body } as Message;
                    entry.handlers.forEach((handler) => handler(safe));
                  },
                  { id: `sub-${destination}`, ack: 'auto' },
                );
              }
            }
            resolve();
          };

          stompClient.onStompError = () => {
            showToastErrorMessage(SYSTEM_MESSAGES.DEFAULT_ERROR_MESSAGES.NETWORK_ERROR);
            reject(new Error('STOMP Error'));
          };

          stompClient.activate();
        } catch (e) {
          showToastErrorMessage(SYSTEM_MESSAGES.DEFAULT_ERROR_MESSAGES.NETWORK_ERROR);
          reject(e);
        }
      })();
    });
  };

  const subscribe = (destination: string, callback: (message: Message) => void) => {
    const client = clientRef.current;
    if (!client) {
      void connectWebSocket();
      return;
    }

    const existing = destinationEntriesRef.current.get(destination);
    if (existing) {
      existing.handlers.add(callback);
      existing.refCount += 1;
      totalRefCountRef.current += 1;
      return;
    }

    const handlers = new Set<(m: Message) => void>([callback]);
    const entry = {
      subscription: client.subscribe(
        destination,
        (message) => {
          const body = (message.body || '').replace(/\0$/, '');
          const safe = { ...message, body } as Message;
          handlers.forEach((handler) => handler(safe));
        },
        { id: `sub-${destination}`, ack: 'auto' },
      ),
      handlers,
      refCount: 1,
    };
    destinationEntriesRef.current.set(destination, entry);
    // 유지: 호환을 위해 원래 배열에도 저장하되, id가 destination이 아님을 감안
    subscriptionsRef.current.push(entry.subscription!);
    totalRefCountRef.current += 1;
  };

  const unsubscribe = (destination: string) => {
    const entry = destinationEntriesRef.current.get(destination);
    if (!entry) return;
    // 핸들러 1개만 등록되어 있다는 가정 하에서는 바로 해제
    entry.refCount -= 1;
    totalRefCountRef.current = Math.max(0, totalRefCountRef.current - 1);
    if (entry.refCount <= 0) {
      try {
        entry.subscription?.unsubscribe({ destination });
      } finally {
        destinationEntriesRef.current.delete(destination);
        subscriptionsRef.current = subscriptionsRef.current.filter(
          (sub) => sub !== entry.subscription,
        );
      }
    }

    // 모든 구독이 해제되면 연결 종료
    if (totalRefCountRef.current === 0) {
      const client = clientRef.current;
      if (client) {
        for (const [dest, ent] of destinationEntriesRef.current.entries()) {
          try {
            ent.subscription?.unsubscribe({ destination: dest });
          } catch {
            throw new Error('구독 해제에 실패했습니다.');
          }
        }
        destinationEntriesRef.current.clear();
        subscriptionsRef.current = [];
        client.deactivate();
        clientRef.current = null;
      }
    }
  };

  const send = (destination: string, message: string) => {
    const client = clientRef.current;
    if (!client || !client.connected) return;
    client.publish({ destination, body: message });
  };

  const disconnect = () => {
    const client = clientRef.current;
    if (!client) return;
    for (const [destination, entry] of destinationEntriesRef.current.entries()) {
      try {
        entry.subscription?.unsubscribe({ destination });
      } catch {
        throw new Error('구독 해제에 실패했습니다.');
      }
    }
    destinationEntriesRef.current.clear();
    subscriptionsRef.current = [];
    client.deactivate();
    clientRef.current = null;
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  const value: WebSocketContextType = {
    clientRef,
    subscriptionsRef,
    connectWebSocket,
    subscribe,
    unsubscribe,
    send,
    disconnect,
  };

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};
