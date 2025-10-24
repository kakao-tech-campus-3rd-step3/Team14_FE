import ChatMessageItemOther from '@/pages/Chat/components/ChatMessageItemOther';
import ChatMessageItemSelf from '@/pages/Chat/components/ChatMessageItemSelf';
import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import type { MessageResponse } from '@/hooks/useChatRoom';

interface ChatMessageSectionProps {
  messages: MessageResponse[];
  isFetching: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

// 하단으로 스크롤하기 위한 임계값
const SCROLL_BOTTOM_THRESHOLD = 50;

/**
 * 채팅 메시지 섹션
 * @param messages - 메시지 목록
 * @param isFetching - 메시지 로딩 상태
 * @param hasNextPage - 다음 페이지 존재 여부
 * @param fetchNextPage - 다음 페이지 가져오기 함수
 * @returns ChatMessageSection
 */
const ChatMessageSection = ({
  messages,
  isFetching,
  hasNextPage,
  fetchNextPage,
}: ChatMessageSectionProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const didInitRef = useRef<boolean>(false);
  const prevScrollHeightRef = useRef<number>(0);
  const prevScrollTopRef = useRef<number>(0);
  const isAtBottomRef = useRef<boolean>(true);
  const previousMessagesLengthRef = useRef<number>(0);
  const isFetchingPrevRef = useRef<boolean>(false);

  const { userInfo } = useAuth();

  // 하단에 있는지 확인하는 함수
  const checkIfAtBottom = () => {
    if (!chatRef.current) return false;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    return scrollHeight - scrollTop - clientHeight < SCROLL_BOTTOM_THRESHOLD;
  };

  // 하단으로 스크롤하는 함수
  const scrollToBottom = (behavior: ScrollBehavior = 'auto') => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior, block: 'end' });
    }
  };

  // 무한 스크롤 트리거 시 현재 스크롤 높이 저장
  const { ref: observerRef } = useIntersectionObserver(() => {
    if (isFetching || !hasNextPage || isFetchingPrevRef.current) return;
    if (!chatRef.current) return;

    // 현재 스크롤 정보 저장 (새 데이터가 추가되기 전)
    prevScrollHeightRef.current = chatRef.current.scrollHeight;
    prevScrollTopRef.current = chatRef.current.scrollTop;
    isFetchingPrevRef.current = true;

    fetchNextPage();
  });

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      isAtBottomRef.current = checkIfAtBottom();
    };

    const chatElement = chatRef.current;
    if (chatElement) {
      chatElement.addEventListener('scroll', handleScroll);
      return () => chatElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // 메시지 변경 시 스크롤 처리
  useEffect(() => {
    if (!chatRef.current) return;

    const isNewMessagesLoaded = messages.length > previousMessagesLengthRef.current;
    const isInitialLoad = !didInitRef.current;

    if (isInitialLoad) {
      // 최초 로딩 시 하단으로 스크롤
      setTimeout(() => scrollToBottom('auto'), 0);
      didInitRef.current = true;
      previousMessagesLengthRef.current = messages.length;
      return;
    }

    if (isNewMessagesLoaded) {
      const isLoadingPreviousMessages = isFetchingPrevRef.current && !isFetching;

      if (isLoadingPreviousMessages) {
        // 이전 메시지 로딩 완료 시 스크롤 위치 복원
        const currentScrollHeight = chatRef.current.scrollHeight;
        const heightDifference = currentScrollHeight - prevScrollHeightRef.current;

        // 이전 스크롤 위치 + 추가된 높이만큼 조정
        chatRef.current.scrollTop = prevScrollTopRef.current + heightDifference;

        // 복원 완료 후 초기화
        prevScrollHeightRef.current = 0;
        prevScrollTopRef.current = 0;
        isFetchingPrevRef.current = false;
      } else if (isAtBottomRef.current) {
        // 하단에 있을 때 새 메시지 시 자동 스크롤
        scrollToBottom('smooth');
      }
    }

    previousMessagesLengthRef.current = messages.length;
  }, [messages, isFetching]);

  return (
    <div ref={chatRef} className="flex flex-col gap-3 overflow-y-auto pr-1 flex-1">
      <div ref={observerRef} className="h-1" />
      {messages.map((message) => {
        const isSelf = userInfo?.userId === Number(message.userId);
        return isSelf ? (
          <ChatMessageItemSelf key={message.id} message={message} />
        ) : (
          <ChatMessageItemOther key={message.id} message={message} />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessageSection;
