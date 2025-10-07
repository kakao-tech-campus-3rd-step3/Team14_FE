const ChatMessageItemMessage = ({ message }: { message: string }) => {
  return (
    <div className="inline-block max-w-[80vw] rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-900 whitespace-pre-wrap break-words">
      {message}
    </div>
  );
};

export default ChatMessageItemMessage;
