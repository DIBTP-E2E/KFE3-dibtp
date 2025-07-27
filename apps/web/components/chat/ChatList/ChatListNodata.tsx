'use client';

import { Button, Icon } from '@repo/ui/components';
import { cn } from '@repo/ui/utils/cn';

interface ChatListNodataProps {
  className?: string;
  onRetry?: () => void;
  title?: string;
  description?: string;
  actionLabel?: string;
}

const ChatListNodata = ({
  className,
  onRetry,
  title = '채팅 내역이 없습니다',
  description = '아직 채팅한 이웃이 없어요. 관심 있는 상품에 채팅을 시작해보세요!',
  actionLabel = '상품 둘러보기',
}: ChatListNodataProps) => {
  return (
    <div
      className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}
    >
      {/* 아이콘 */}
      <div className="w-16 h-16 bg-bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon name="Chat" size="lg" className="text-text-muted" />
      </div>

      {/* 제목 */}
      <h3 className="text-lg font-medium text-text-base mb-2">{title}</h3>

      {/* 설명 */}
      <p className="text-text-muted text-sm mb-6 max-w-xs leading-relaxed">{description}</p>

      {/* 액션 버튼 */}
      {onRetry && <Button onClick={onRetry}>{actionLabel}</Button>}
    </div>
  );
};

export default ChatListNodata;
