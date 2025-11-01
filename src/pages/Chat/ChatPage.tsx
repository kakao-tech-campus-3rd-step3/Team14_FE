import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import useChatRoom from '@/hooks/useChatRoom';
import ChatSendSection from '@/pages/Chat/components/ChatSendSection';
import ChatMessageSection from '@/pages/Chat/components/ChatMessageSection';
import { Suspense, useState } from 'react';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useNav from '@/hooks/useNav';
import deleteChatRoom from '@/apis/chat/deleteChatRoom';
import { useMutation } from '@tanstack/react-query';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { showToastErrorMessage } from '@/utils/showToastMessage';
import { subscribeTopic } from '@/hooks/useChatRoom';
import { useWebSocket } from '@/context/WebSocketContext';

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
    message,
    handleMessageChange,
    handleKeyPress,
    messages,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useChatRoom();

  const { unsubscribe } = useWebSocket();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { goBack } = useNav();
  const { mutate: deleteChatRoomMutation } = useMutation({
    mutationFn: deleteChatRoom,
    onSuccess: () => {
      goBack();
    },
    onError: () => {
      showToastErrorMessage('채팅방 나가기에 실패했습니다.');
    },
  });

  const handleDeleteChatRoom = () => {
    deleteChatRoomMutation(chatRoom.roomId);
    unsubscribe(subscribeTopic(chatRoom.roomId));
  };

  return (
    <Container>
      <Header
        variant="chat"
        title={
          chatRoom.roomName.length > 16 ? `${chatRoom.roomName.slice(0, 16)}...` : chatRoom.roomName
        }
        onClick={() => setIsConfirmOpen(true)}
      />
      <div className="flex flex-col px-4 py-2 gap-1 h-[calc(100dvh-110px)]">
        <Suspense fallback={<LoadingSpinner />}>
          <ChatMessageSection
            messages={messages}
            isFetching={isFetching}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        </Suspense>
        <ChatSendSection
          message={message}
          handleMessageChange={handleMessageChange}
          handleKeyPress={handleKeyPress}
          sendMessage={sendMessage}
          sendImageMessage={sendImageMessage}
        />
      </div>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteChatRoom}
        title="채팅방 나가기"
        message="채팅방을 나가시겠습니까?"
      />
      <Footer initialSelected="none" />
    </Container>
  );
};

export default ChatPage;
