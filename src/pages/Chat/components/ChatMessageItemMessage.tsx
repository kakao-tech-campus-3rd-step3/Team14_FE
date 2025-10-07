const ChatMessageItemMessage = ({ message, isSelf }: { message: string; isSelf: boolean }) => {
  return (
    <div
      className={`inline-block max-w-[80vw] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words ${isSelf ? 'bg-primary-100 text-gra-900' : 'bg-gray-100 text-gray-900'}`}
    >
      {message}
    </div>
  );
};

export default ChatMessageItemMessage;
