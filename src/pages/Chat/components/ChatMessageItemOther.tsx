import type { MessageResponse } from '@/hooks/useChatRoom';
import ChatMessageItemImage from '@/pages/Chat/components/ChatMessageItemImage';
import ChatMessageItemMessage from '@/pages/Chat/components/ChatMessageItemMessage';

interface ChatMessageItemOtherProps {
  message: MessageResponse;
}

const ChatMessageItemOther = ({ message }: ChatMessageItemOtherProps) => {
  return (
    <div className="flex w-full items-start gap-2">
      <div className="size-9 shrink-0">
        <img
          src={message.profileImgUrl}
          alt={message.senderName}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <div className="text-sm font-semibold text-gray-900">{message.senderName}</div>
        {message.imageUrl ? (
          <ChatMessageItemImage imageUrl={message.imageUrl} />
        ) : (
          <ChatMessageItemMessage message={message.content} isSelf={false} />
        )}
      </div>
    </div>
  );
};

export default ChatMessageItemOther;
