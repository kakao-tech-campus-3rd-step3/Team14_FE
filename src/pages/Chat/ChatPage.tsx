import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import useChatRoom from '@/hooks/useChatRoom';
import ChatSendSection from '@/pages/Chat/components/ChatSendSection';
import ChatMessageSection from '@/pages/Chat/components/ChatMessageSection';

/**
 * 채팅 페이지
 * 축제 상세 페이지에서 채팅 버튼 클릭 시 이동하는 페이지
 * 컴포넌트 별로 useChatRoom 훅을 나눠서 사용하려고 했지만
 * 단일 STOMP 연결, 단일 구독을 보장하기 위해 하나의 훅으로 사용하도록 하였습니다.
 * @returns ChatPage
 */
const ChatPage = () => {
  const {
    chatRoom,
    sendMessage,
    sendImageMessage,
    messages,
    message,
    handleMessageChange,
    handleKeyPress,
  } = useChatRoom();

  return (
    <Container>
      <Header variant="page" title={chatRoom.roomName} />
      <div className="flex flex-col px-4 py-2 gap-1 h-[calc(100dvh-110px)]">
        <ChatMessageSection messages={messages} />
        <ChatSendSection
          message={message}
          handleMessageChange={handleMessageChange}
          handleKeyPress={handleKeyPress}
          sendMessage={sendMessage}
          sendImageMessage={sendImageMessage}
        />
      </div>
      <Footer initialSelected="none" />
    </Container>
  );
};

export default ChatPage;
