'use client';

import { cn } from '@repo/ui/utils/cn';

interface ChatListSkeletonProps {
  className?: string;
  count?: number;
}

const ChatRoomItemSkeleton = () => (
  <li className="p-4 border-b border-border-base animate-pulse">
    <div className="flex items-center gap-3">
      {/* 아바타 스켈레톤 */}
      <div className="w-12 h-12 bg-bg-base rounded-full shrink-0" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          {/* 채팅방 제목 스켈레톤 */}
          <div className="h-4 bg-bg-base rounded w-32" />
          {/* 시간 스켈레톤 */}
          <div className="h-3 bg-bg-base rounded w-12" />
        </div>

        <div className="flex items-center justify-between">
          {/* 마지막 메시지 스켈레톤 */}
          <div className="h-3 bg-bg-base rounded w-48" />
          {/* 읽지 않은 메시지 카운트 스켈레톤 */}
          <div className="w-5 h-5 bg-bg-base rounded-full" />
        </div>
      </div>
    </div>
  </li>
);

const ChatListSkeleton = ({ className, count = 2 }: ChatListSkeletonProps) => {
  return (
    <div className={cn('space-y-0', className)}>
      {Array.from({ length: count }, (_, index) => (
        <ChatRoomItemSkeleton key={index} />
      ))}
    </div>
  );
};

export default ChatListSkeleton;
