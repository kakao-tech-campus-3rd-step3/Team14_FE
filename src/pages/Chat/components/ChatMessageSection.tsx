import ChatMessageItemOther from '@/pages/Chat/components/ChatMessageItemOther';
import ChatMessageItemSelf from '@/pages/Chat/components/ChatMessageItemSelf';
import type { MessageResponse } from '@/hooks/useChatRoom';
import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';

interface ChatMessageSectionProps {
  messages: MessageResponse[];
}

const ChatMessageSection = ({ messages }: ChatMessageSectionProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const didInitRef = useRef<boolean>(false);

  const { userInfo } = useAuth();

  useEffect(() => {
    if (!bottomRef.current) return;
    // 최초 로딩은 즉시 이동, 이후엔 부드럽게 이동
    const behavior: ScrollBehavior = didInitRef.current ? 'smooth' : 'auto';
    bottomRef.current.scrollIntoView({ behavior, block: 'end' });
    didInitRef.current = true;
  }, [messages.length]);

  return (
    <div className="flex flex-col gap-3 overflow-y-auto pr-1 flex-1">
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
