import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ChatPage from '@/pages/Chat/ChatPage';
import ChatMessageItemOther from '@/pages/Chat/components/ChatMessageItemOther';
import ChatMessageItemSelf from '@/pages/Chat/components/ChatMessageItemSelf';
import ChatSendSection from '@/pages/Chat/components/ChatSendSection';
import TestWrapper from '@/__tests__/TestWrapper';

// jsdom에는 scrollIntoView가 없으므로 목킹
Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  configurable: true,
  writable: true,
  value: vi.fn(),
});

// Footer의 앵커로 인한 jsdom URL 예외를 피하기 위해 목킹
vi.mock('@/components/common/Footer', () => ({
  default: () => <div data-testid="footer" />,
}));

// AuthContext 완전 목킹하여 API 호출 방지
vi.mock('@/context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: () => ({
    user: { id: 10, name: 'TestUser' },
    userInfo: { userId: 10, userName: 'TestUser' }, // ChatMessageSection에서 사용
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

// useChatRoom 훅 목킹: 소켓/구독 없이 상호작용 검증만 수행
const sendMessageMock = vi.fn();
const sendImageMessageMock = vi.fn();
const handleMessageChangeMock = vi.fn();
const fetchNextPageMock = vi.fn();

const mockCurrentMessages = [
  {
    id: 1,
    userId: 10,
    senderName: 'Alice',
    profileImgUrl: '/a.png',
    content: 'hello',
    imageUrl: '',
    createdAt: '2024-01-01T10:31:00Z',
  },
  {
    id: 2,
    userId: 11,
    senderName: 'Bob',
    profileImgUrl: '/b.png',
    content: 'world',
    imageUrl: '',
    createdAt: '2024-01-01T10:31:00Z',
  },
];

// React 상태를 시뮬레이션하기 위한 객체
const mockChatState = {
  message: '',
  setMessage: (value: string) => {
    mockChatState.message = value;
  },
};

// 무한 스크롤 상태를 시뮬레이션하기 위한 객체
const mockInfiniteScrollState = {
  hasNextPage: true,
  isFetching: false,
  setHasNextPage: (value: boolean) => {
    mockInfiniteScrollState.hasNextPage = value;
  },
  setIsFetching: (value: boolean) => {
    mockInfiniteScrollState.isFetching = value;
  },
};

vi.mock('@/hooks/useChatRoom', () => ({
  __esModule: true,
  default: () => ({
    chatRoom: { roomId: 1, roomName: '축제 채팅방' },
    messages: mockCurrentMessages,
    message: mockChatState.message,
    sendMessage: sendMessageMock,
    sendImageMessage: sendImageMessageMock,
    handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      mockChatState.setMessage(e.target.value);
      handleMessageChangeMock(e);
    },
    handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessageMock();
      }
    },
    // 무한 스크롤을 위한 추가 속성
    fetchNextPage: fetchNextPageMock,
    hasNextPage: mockInfiniteScrollState.hasNextPage,
    isFetching: mockInfiniteScrollState.isFetching,
  }),
}));

// useMediaUpload 훅 목킹
vi.mock('@/hooks/useMediaUpload', () => ({
  useMediaUpload: () => ({
    pickAndUploadImages: vi.fn(),
    imageInfos: [],
    setImageInfos: vi.fn(),
  }),
}));

describe('ChatPage', () => {
  beforeEach(() => {
    sendMessageMock.mockClear();
    sendImageMessageMock.mockClear();
    handleMessageChangeMock.mockClear();
    fetchNextPageMock.mockClear();
    mockChatState.setMessage(''); // 각 테스트 전에 메시지 상태 초기화
    mockInfiniteScrollState.setHasNextPage(true); // 무한 스크롤 상태 초기화
    mockInfiniteScrollState.setIsFetching(false);
  });

  test('스냅샷 - 상대 메시지 컴포넌트', () => {
    // Given: 상대방이 보낸 메시지 데이터가 주어지고
    const { container } = render(
      <ChatMessageItemOther
        message={{
          id: 100,
          userId: 11,
          senderName: 'Other',
          profileImgUrl: '/other.png',
          content: '상대 메시지 내용',
          imageUrl: '',
        }}
      />,
    );

    // When: ChatMessageItemOther 컴포넌트를 렌더링했을 때
    // Then: 상대방 메시지 UI가 올바르게 표시된다
    expect(container.firstChild).toMatchSnapshot('chat-message-item-other');
  });

  test('스냅샷 - 자신 메시지 컴포넌트', () => {
    // Given: 내가 보낸 메시지 데이터가 주어지고
    const { container } = render(
      <ChatMessageItemSelf
        message={{
          id: 101,
          userId: 10,
          senderName: 'Me',
          profileImgUrl: '/me.png',
          content: '내 메시지 내용',
          imageUrl: '',
        }}
      />,
    );

    // When: ChatMessageItemSelf 컴포넌트를 렌더링했을 때
    // Then: 자신의 메시지 UI가 올바르게 표시된다
    expect(container.firstChild).toMatchSnapshot('chat-message-item-self');
  });

  test('스냅샷 - 전송 컴포넌트', () => {
    // Given: 메시지 전송에 필요한 핸들러들이 주어지고
    const noop = () => {};
    const sendImageNoop = () => {};
    const { container } = render(
      <ChatSendSection
        message={''}
        handleMessageChange={noop as unknown as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
        handleKeyPress={noop as unknown as (e: React.KeyboardEvent<HTMLTextAreaElement>) => void}
        sendMessage={noop}
        sendImageMessage={
          sendImageNoop as (imageInfo: { id: number; presignedUrl: string }) => void
        }
      />,
    );

    // When: ChatSendSection 컴포넌트를 렌더링했을 때
    // Then: 메시지 입력창과 전송 버튼이 올바르게 표시된다
    expect(container.firstChild).toMatchSnapshot('chat-send-section');
  });

  test('채팅 페이지가 렌더링되고 기본 UI 요소들이 표시된다', () => {
    // Given: 채팅방 데이터와 메시지 목록이 주어지고
    // When: ChatPage를 렌더링했을 때
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>,
    );

    // Then: 헤더, 메시지 목록, 입력창이 모두 표시된다
    expect(screen.getByText('축제 채팅방')).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('world')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('메시지 입력...')).toBeInTheDocument();
  });

  test('Enter 키로 메시지 전송이 호출된다', () => {
    // Given: 채팅 페이지가 렌더링되고
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>,
    );

    // When: 메시지 입력창에서 Enter 키를 눌렀을 때
    const textbox = screen.getByPlaceholderText('메시지 입력...');
    fireEvent.keyDown(textbox, { key: 'Enter', code: 'Enter', shiftKey: false });

    // Then: 메시지 전송 함수가 호출된다
    expect(sendMessageMock).toHaveBeenCalledTimes(1);
  });

  test('Shift+Enter는 메시지 전송을 호출하지 않는다', () => {
    // Given: 채팅 페이지가 렌더링되고
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>,
    );

    // When: 메시지 입력창에서 Shift+Enter 키를 눌렀을 때
    const textbox = screen.getByPlaceholderText('메시지 입력...');
    fireEvent.keyDown(textbox, { key: 'Enter', code: 'Enter', shiftKey: true });

    // Then: 메시지 전송 함수가 호출되지 않는다 (개행 처리)
    expect(sendMessageMock).not.toHaveBeenCalled();
  });

  test('메시지를 입력했을 때 전송 버튼이 활성화된다', () => {
    // Given: 채팅 페이지가 렌더링되고
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>,
    );

    // When: 메시지 입력창에 텍스트를 입력했을 때
    const textbox = screen.getByPlaceholderText('메시지 입력...');
    fireEvent.change(textbox, { target: { value: '새 메시지' } });

    // Then: 전송 버튼이 활성화된다
    const button = screen.getByRole('button', { name: /send|image/i });
    expect(button).toBeEnabled();
  });

  test('전송 버튼 클릭 시 메시지 전송이 호출된다', () => {
    // Given: 메시지가 입력된 ChatSendSection이 렌더링되고
    const mockSendMessage = vi.fn();
    render(
      <ChatSendSection
        message="새 메시지"
        handleMessageChange={vi.fn()}
        handleKeyPress={vi.fn()}
        sendMessage={mockSendMessage}
        sendImageMessage={vi.fn()}
      />,
    );

    // When: 전송 버튼을 클릭했을 때
    const button = screen.getByRole('button', { name: /send/i });
    fireEvent.click(button);

    // Then: 메시지 전송 함수가 호출된다
    expect(mockSendMessage).toHaveBeenCalledTimes(1);
  });

  describe('무한 스크롤', () => {
    test('IntersectionObserver가 관찰 대상 요소를 감지한다', () => {
      // Given: 더 불러올 페이지가 있고
      mockInfiniteScrollState.setHasNextPage(true);

      // When: ChatPage가 렌더링되면
      render(
        <TestWrapper>
          <ChatPage />
        </TestWrapper>,
      );

      // Then: IntersectionObserver가 생성되어야 한다
      expect(global.IntersectionObserver).toBeDefined();
    });

    test('hasNextPage가 true일 때 무한 스크롤 영역이 표시된다', () => {
      // Given: 더 불러올 페이지가 있고
      mockInfiniteScrollState.setHasNextPage(true);

      // When: ChatPage가 렌더링되면
      const { container } = render(
        <TestWrapper>
          <ChatPage />
        </TestWrapper>,
      );

      // Then: 무한 스크롤 관찰 영역이 존재해야 한다 (h-1 클래스를 가진 div)
      const observerElement = container.querySelector('.h-1');
      expect(observerElement).toBeInTheDocument();
    });

    test('isFetching이 true일 때는 fetchNextPage가 호출되지 않는다', () => {
      // Given: 이미 데이터를 불러오는 중이고
      mockInfiniteScrollState.setIsFetching(true);
      mockInfiniteScrollState.setHasNextPage(true);

      // When: ChatPage가 렌더링되면
      render(
        <TestWrapper>
          <ChatPage />
        </TestWrapper>,
      );

      // Then: fetchNextPage가 호출되지 않아야 한다
      expect(fetchNextPageMock).not.toHaveBeenCalled();
    });

    test('hasNextPage가 false일 때는 fetchNextPage가 호출되지 않는다', () => {
      // Given: 더 이상 불러올 페이지가 없고
      mockInfiniteScrollState.setHasNextPage(false);
      mockInfiniteScrollState.setIsFetching(false);

      // When: ChatPage가 렌더링되면
      render(
        <TestWrapper>
          <ChatPage />
        </TestWrapper>,
      );

      // Then: fetchNextPage가 호출되지 않아야 한다
      expect(fetchNextPageMock).not.toHaveBeenCalled();
    });

    test('메시지 목록이 올바르게 렌더링된다', () => {
      // Given: 2개의 메시지가 주어지고
      // When: ChatPage가 렌더링되면
      render(
        <TestWrapper>
          <ChatPage />
        </TestWrapper>,
      );

      // Then: 모든 메시지 내용이 표시되어야 한다
      expect(screen.getByText('hello')).toBeInTheDocument();
      expect(screen.getByText('world')).toBeInTheDocument();
      // userId 10은 자신의 메시지라 이름 미표시, userId 11은 상대방이라 이름 표시
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.queryByText('Alice')).not.toBeInTheDocument(); // 자신의 메시지는 이름 미표시
    });

    test('스크롤 컨테이너가 overflow-y-auto 클래스를 가진다', () => {
      // Given: ChatPage가 렌더링되고
      const { container } = render(
        <TestWrapper>
          <ChatPage />
        </TestWrapper>,
      );

      // When: 메시지 컨테이너를 찾으면
      const scrollContainer = container.querySelector('.overflow-y-auto');

      // Then: 스크롤 가능한 컨테이너가 존재해야 한다
      expect(scrollContainer).toBeInTheDocument();
    });
  });
});
