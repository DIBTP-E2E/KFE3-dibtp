'use client';

import { Avatar, Badge } from '@repo/ui/components';
import { cn } from '@repo/ui/utils/cn';

import Link from 'next/link';

import { PAGE_ROUTES } from '@web/constants';
import type { ChatRoomWithDetails } from '@web/types/chat';
import { formatLastMessageTime } from '@web/utils/date';
// TODO: 상품명 대신 상품 이미지 노출 예정
// import { ProductThumb } from '@web/components/products';

interface ChatRoomItemProps {
  chatRoom: ChatRoomWithDetails;
  currentUserId: string;
  className?: string;
}

// TODO: 가격 실시간 적용되도록 수정 얘정
// const formatPrice = (price: number) => {
//   return new Intl.NumberFormat('ko-KR').format(price);
// };

const ChatListItem = ({ chatRoom, currentUserId, className }: ChatRoomItemProps) => {
  const chatRoomId = chatRoom.chat_room_id;
  const isSellerView = chatRoom.seller_user_id === currentUserId;
  const otherUser = isSellerView ? chatRoom.buyer_profile : chatRoom.seller_profile;
  const otherUserNickname = otherUser?.nickname || '익명';
  const hasUnreadMessages = (chatRoom.unread_count || 0) > 0;

  return (
    <Link href={PAGE_ROUTES.CHAT.ROOM(chatRoomId)}>
      <article
        className={cn(
          'w-full flex items-center justify-between gap-xs p-md',
          'border-b border-border-base transition-colors',
          hasUnreadMessages && 'bg-bg-primary-50/50',
          className
        )}
        aria-label={`${otherUserNickname} 님이 보낸 메시지 확인하기`}
      >
        <div className="flex-1 flex items-center gap-md min-w-0">
          {/* 사용자 아바타 */}
          <div className="relative">
            <Avatar src={otherUser?.profile_image || undefined} alt={otherUserNickname} size="sm" />
            {hasUnreadMessages && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-bg-primary rounded-full" />
            )}
          </div>

          {/* 채팅 정보 */}
          <div className="flex-1 min-w-0">
            {/* 상단: 사용자 정보 */}
            <div className="flex items-center gap-sm mb-sm">
              <span
                className={cn(
                  'text-sm truncate',
                  hasUnreadMessages ? 'text-text-base text-bold' : 'text-text-base'
                )}
              >
                {otherUser?.nickname || '익명'}
              </span>
            </div>

            {/* 중단: 상품 정보 */}
            <div className="flex items-center gap-2 mb-1">
              <span className="truncate font-style-small">{chatRoom.product?.title}</span>
            </div>

            {/* 하단: 마지막 메시지 */}
            {chatRoom.last_message ? (
              <p
                className={cn(
                  'font-style-medium truncate',
                  hasUnreadMessages ? 'text-text-base font-medium' : 'text-text-info'
                )}
              >
                {chatRoom.last_message.sender_user_id === currentUserId && '나: '}
                {chatRoom.last_message.message}
              </p>
            ) : (
              <p className="text-text-info italic">메시지가 없습니다</p>
            )}
          </div>
        </div>

        <div className="h-full flex flex-col items-end justify-between gap-lg">
          {/* 마지막 메시지 시간 */}
          {chatRoom.last_message && (
            <span className="text-text-info shrink-0 mb-auto">
              {formatLastMessageTime(chatRoom.last_message.created_at)}
            </span>
          )}

          {/* 읽지 않은 메시지 수신 */}
          {hasUnreadMessages && (
            <Badge color="primary" size="sm">
              {chatRoom.unread_count! > 99 ? '99+' : chatRoom.unread_count}
            </Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default ChatListItem;
