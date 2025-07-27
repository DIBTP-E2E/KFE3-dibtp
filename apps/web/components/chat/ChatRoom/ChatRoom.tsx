'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

import { IconButton } from '@repo/ui/components';
import { cn } from '@repo/ui/utils/cn';

import {
  useChatMessages,
  useSendMessage,
  useMarkMessagesAsRead,
  useRealtimeMessages,
} from '@web/hooks/chat';
import type { ChatRoomWithDetails } from '@web/types/chat';

import ChatRoomNodata from './ChatRoomNodata';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface ChatRoomProps {
  chatRoom: ChatRoomWithDetails;
  currentUserId: string;
  className?: string;
}

const ChatRoom = ({ chatRoom, currentUserId, className }: ChatRoomProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 메시지 목록 조회
  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useChatMessages({
    chatRoomId: chatRoom.chat_room_id,
    userId: currentUserId,
  });

  // 메시지 전송
  const sendMessageMutation = useSendMessage({
    chatRoomId: chatRoom.chat_room_id,
  });

  // 메시지 읽음 처리
  const markAsReadMutation = useMarkMessagesAsRead({
    chatRoomId: chatRoom.chat_room_id,
  });

  // 실시간 메시지 구독
  useRealtimeMessages({
    chatRoomId: chatRoom.chat_room_id,
    userId: currentUserId,
  });

  const messages = useMemo(() => {
    if (!messagesData?.pages) return [];
    return messagesData.pages.flatMap((page: any) => page?.messages || []);
  }, [messagesData?.pages]);
  const isSellerView = chatRoom.seller_user_id === currentUserId;
  const otherUser = isSellerView ? chatRoom.buyer_profile : chatRoom.seller_profile;

  // 스크롤 맨 아래로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 스크롤 위치 감지
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < threshold;

    setIsAtBottom(isNearBottom);

    // 맨 위에 도달했을 때 이전 메시지 로드
    if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // 메시지 전송 핸들러
  const handleSendMessage = (message: string) => {
    sendMessageMutation.mutate({
      chat_room_id: chatRoom.chat_room_id,
      message,
      sender_user_id: currentUserId,
    });
  };

  // 새 메시지 시 자동 스크롤
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages.length, isAtBottom]);

  // 화면 진입 시 읽지 않은 메시지 읽음 처리
  useEffect(() => {
    const unreadMessages = messages.filter(
      (msg) => !msg.is_read && msg.sender_user_id !== currentUserId
    );

    if (unreadMessages.length > 0) {
      markAsReadMutation.mutate({
        chat_room_id: chatRoom.chat_room_id,
        user_id: currentUserId,
        message_ids: unreadMessages.map((msg) => msg.chat_message_id),
      });
    }
  }, [messages, currentUserId, chatRoom.chat_room_id, markAsReadMutation]);

  return (
    <section className={cn('flex flex-col h-full bg-bg-light', className)}>
      {/* 메시지 목록 */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {/* 로딩 인디케이터 */}
        {isLoading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-border-primary" />
          </div>
        )}

        {/* 이전 메시지 로드 버튼 */}
        {hasNextPage && (
          <div className="flex justify-center py-2">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="text-sm text-text-primary disabled:opacity-50"
            >
              {isFetchingNextPage ? '로딩 중...' : '이전 메시지 보기'}
            </button>
          </div>
        )}

        {/* 메시지 리스트 */}
        {messages.map((message, index) => {
          const isOwn = message.sender_user_id === currentUserId;
          const prevMessage = messages[index - 1];
          const showAvatar =
            !isOwn &&
            (!prevMessage ||
              prevMessage.sender_user_id !== message.sender_user_id ||
              new Date(message.created_at).getTime() - new Date(prevMessage.created_at).getTime() >
                5 * 60 * 1000);

          return (
            <MessageBubble
              key={message.chat_message_id}
              message={message}
              isOwn={isOwn}
              showAvatar={showAvatar}
              showTime={true}
            />
          );
        })}

        {/* 빈 상태 */}
        {messages.length === 0 && !isLoading && <ChatRoomNodata />}

        <div ref={messagesEndRef} />
      </div>

      {/* 맨 아래로 스크롤 버튼 */}
      {!isAtBottom && (
        <div className="absolute bottom-20 right-4">
          <IconButton
            iconName="ArrowDown"
            onClick={scrollToBottom}
            color="primary"
            variant="fulled"
            iconSize="sm"
            buttonSize="sm"
            className="shadow-lg"
            ariaLabel="맨 아래로"
          />
        </div>
      )}

      {/* 메시지 입력 */}
      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={sendMessageMutation.isPending}
        placeholder={`${otherUser?.nickname || '상대방'}에게 메시지 보내기...`}
      />
    </section>
  );
};

export default ChatRoom;
