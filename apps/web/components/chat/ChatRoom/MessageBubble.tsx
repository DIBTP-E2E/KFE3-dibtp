'use client';

import { Avatar, Badge } from '@repo/ui/components';
import { cn } from '@repo/ui/utils/cn';

import type { ChatMessage, ChatMessageWithSender, MessageStatus } from '@web/types/chat';

interface MessageBubbleProps {
  message:
    | ChatMessageWithSender
    | (ChatMessage & { sender?: { nickname: string; profile_image: string | null } });
  isOwn: boolean;
  showAvatar?: boolean;
  showTime?: boolean;
}

const getStatusColor = (status: MessageStatus) => {
  switch (status) {
    case 'sending':
      return 'text-text-disabled';
    case 'sent':
      return 'text-text-primary';
    case 'delivered':
      return 'text-text-primary';
    case 'read':
      return 'text-text-success';
    case 'failed':
      return 'text-text-error';
    default:
      return 'text-text-disabled';
  }
};

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const MessageBubble = ({
  message,
  isOwn,
  showAvatar = true,
  showTime = true,
}: MessageBubbleProps) => {
  const status = ('status' in message ? message.status : 'sent') as MessageStatus;

  return (
    <div className={cn('flex gap-2 w-full', isOwn ? 'flex-row-reverse' : 'flex-row')}>
      {/* 아바타 */}
      {showAvatar && !isOwn && (
        <Avatar
          src={message.sender?.profile_image || undefined}
          alt={message.sender?.nickname || '익명'}
          size="md"
          className="mt-1"
        />
      )}

      {/* 메시지 컨테이너 */}
      <div className={cn('flex flex-col max-w-[70%]', isOwn ? 'items-end' : 'items-start')}>
        {/* 발신자 이름 (본인 메시지가 아닌 경우) */}
        {/* {!isOwn && showAvatar && (
          <span className="text-xs text-text-info mb-1 px-2">
            {message.sender?.nickname || '익명'}
          </span>
        )} */}

        {/* 메시지 버블 */}
        <div
          className={cn(
            'relative px-3 py-2 rounded-2xl break-words',
            isOwn
              ? 'bg-bg-primary text-text-inverse rounded-br-md'
              : 'bg-bg-base text-text-base rounded-bl-md'
          )}
        >
          <p className="whitespace-pre-wrap text-sm">{message.message}</p>

          {/* 실패한 메시지 표시 */}
          {status === 'failed' && (
            <Badge variant="fulled" color="danger" size="sm" className="mt-1">
              전송 실패
            </Badge>
          )}
        </div>

        {/* 시간 및 상태 */}
        {showTime && (
          <div
            className={cn(
              'flex items-center gap-1 mt-1 px-2',
              isOwn ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <span className="text-xs text-text-info">{formatTime(message.created_at)}</span>

            {/* 본인 메시지인 경우 읽음 상태 표시 */}
            {isOwn && (
              <span className={cn('text-xs', getStatusColor(status))}>
                {status === 'sending' && '전송 중'}
                {status === 'sent' && '전송됨'}
                {status === 'delivered' && '전달됨'}
                {status === 'read' && '읽음'}
                {status === 'failed' && '실패'}
              </span>
            )}

            {/* 읽지 않은 표시 */}
            {!isOwn && !message.is_read && <div className="w-2 h-2 bg-bg-primary rounded-full" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
