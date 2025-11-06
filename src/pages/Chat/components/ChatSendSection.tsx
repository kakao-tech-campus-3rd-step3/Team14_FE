import Button from '@/components/common/Button';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { useEffect, useRef } from 'react';

interface ChatSendSectionProps {
  message: string;
  handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  sendMessage: () => void;
  sendImageMessage: (imageInfo: { id: number; presignedUrl: string }) => void;
}

const ChatSendSection = ({
  message,
  handleMessageChange,
  handleKeyPress,
  sendMessage,
  sendImageMessage,
}: ChatSendSectionProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // message 변경 시 자동 높이 조절
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [message]);

  // 이미지 업로드
  const { pickAndUploadImages, imageInfos, setImageInfos } = useMediaUpload();

  const handleSend = () => {
    if (imageInfos.length === 1) {
      // 이미지 1개 전송
      sendImageMessage(imageInfos[0]);
      setImageInfos([]);
      // 메시지 전송
    } else if (message.trim().length > 0) {
      sendMessage();
    }
  };

  return (
    <div className="pt-1 bg-white w-full">
      <div className="flex w-full items-center justify-between rounded-2xl border border-gray-300 pl-4 pr-1 py-1">
        {imageInfos.length === 0 ? (
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleMessageChange}
            onKeyDown={(e) => {
              if (!e.shiftKey) {
                // Enter: 전송, Shift+Enter: 줄바꿈
                handleKeyPress(e);
              }
            }}
            placeholder="메시지 입력..."
            rows={1}
            maxLength={255}
            className="w-full py-2 bg-transparent text-sm outline-none placeholder:text-gray-400 resize-none overflow-hidden whitespace-pre-wrap leading-5"
          />
        ) : (
          <div className="py-2 bg-transparent text-sm outline-none ">
            {imageInfos.map((image, index) => (
              <div key={index} className="relative ">
                <img
                  src={image.presignedUrl}
                  alt={`업로드된 이미지 ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => setImageInfos((prev) => prev.filter((_, i) => i !== index))}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <Button
          className="shrink-0 rounded-full text-sm"
          variant="icon"
          size="sm"
          onClick={handleSend}
          aria-label={message.trim().length > 0 || imageInfos.length > 0 ? 'send' : 'image'}
        >
          {message.trim().length > 0 || imageInfos.length > 0 ? (
            <img src="/send.svg" alt="send" className="size-5" />
          ) : (
            <img onClick={pickAndUploadImages} src="/image.svg" alt="image" className="size-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatSendSection;
