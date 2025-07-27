'use client';

import { useState } from 'react';

import { Tabs } from '@repo/ui/components';

import { useMyInfo } from '@web/hooks';
import { useChatRooms, useRealtimeChatRoomsList } from '@web/hooks/chat';
import type { ChatListFilter } from '@web/types/chat';

import ChatListError from './ChatListError';
import ChatListItem from './ChatListItem';
import ChatListNodata from './ChatListNodata';
import ChatListSkeleton from './ChatListSkeleton';

interface ChatListProps {
  productId?: number;
  className?: string;
}

const FILTER_OPTION = [
  { key: 'all' as const, label: '전체' },
  { key: 'unread' as const, label: '읽지 않음' },
  { key: 'active' as const, label: '진행중' },
];

export const ChatList = ({ productId }: ChatListProps) => {
  const { userId } = useMyInfo();
  const [filter, setFilter] = useState<ChatListFilter>({
    status: 'all',
    product_id: productId,
  });

  // 채팅방 목록 조회
  const {
    data: chatRoomsData,
    isLoading,
    error,
    refetch,
  } = useChatRooms({
    filter,
  });

  // 실시간 채팅방 목록 업데이트 구독
  useRealtimeChatRoomsList();

  const chatRooms = chatRoomsData?.chatRooms || [];
  // const totalUnreadCount = chatRooms.reduce((sum, room) => sum + (room.unread_count || 0), 0);

  const handleFilterChange = (key: string) => {
    const status = key as ChatListFilter['status'];
    setFilter({
      ...filter,
      status,
      product_id: productId,
    });
  };

  if (error) return <ChatListError onClick={refetch} />;

  return (
    <>
      <Tabs
        options={FILTER_OPTION}
        activeTab={filter.status || 'all'}
        onTabChange={handleFilterChange}
        size="md"
        color="primary"
        variant="fulled"
        aria-label="채팅방 필터"
      />

      {/* TODO: 안 읽은 메시지에 대한 UI 디자인 정의 후 노출      
      <div className="flex items-center justify-between mb-4">
        {totalUnreadCount > 0 && (
          <>안 읽은 메시지: {totalUnreadCount > 99 ? '99+' : totalUnreadCount}</>
        )}
      </div> */}

      {/* 채팅방 목록 */}
      <ul className="flex-1 overflow-y-auto">
        {isLoading ? (
          <ChatListSkeleton />
        ) : chatRooms.length === 0 ? (
          <ChatListNodata />
        ) : (
          chatRooms.map((chatRoom) => (
            <li key={chatRoom.chat_room_id}>
              <ChatListItem chatRoom={chatRoom} currentUserId={userId} />
            </li>
          ))
        )}
      </ul>
    </>
  );
};
