import type { MessageResponse } from '@/hooks/useChatRoom';
import ChatMessageItemImage from '@/pages/Chat/components/ChatMessageItemImage';
import ChatMessageItemMessage from '@/pages/Chat/components/ChatMessageItemMessage';

interface ChatMessageItemSelfProps {
  message: MessageResponse;
}

const ChatMessageItemSelf = ({ message }: ChatMessageItemSelfProps) => {
  return (
    <div className="flex w-full items-start gap-2 justify-end">
      <div className="flex min-w-0 flex-col gap-1">
        {message.imageUrl ? (
          <ChatMessageItemImage imageUrl={message.imageUrl} />
        ) : (
          <ChatMessageItemMessage message={message.content} isSelf={true} />
        )}
      </div>
    </div>
  );
};

export default ChatMessageItemSelf;
