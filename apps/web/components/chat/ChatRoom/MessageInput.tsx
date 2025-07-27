'use client';

import { useState } from 'react';

import { IconButton, Input } from '@repo/ui/components';
import { cn } from '@repo/ui/utils/cn';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

const MessageInput = ({
  onSendMessage,
  disabled = false,
  placeholder = '메시지를 입력하세요...',
  maxLength = 1000,
  className,
}: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const trimmedMessage = message.trim();
  const canSend = trimmedMessage.length > 0 && !disabled;

  const handleSend = () => {
    if (!canSend) return;

    onSendMessage(trimmedMessage);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 조합 중이 아니고 Shift+Enter가 아닌 Enter 시 전송
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setMessage(value);
    }
  };

  return (
    <div
      className={cn(
        'flex items-end gap-xs p-container pr-xs bg-bg-light border-t border-border-base',
        className
      )}
    >
      {/* 메시지 입력 영역 */}
      <div className="flex-1 relative">
        <Input
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder={placeholder}
          disabled={disabled}
          className="font-normal"
        />

        {/* 글자 수 표시 */}
        {message.length > 0 && (
          <div className="absolute bottom-2 right-3 text-xs text-text-info">
            {message.length}/{maxLength}
          </div>
        )}
      </div>

      {/* 전송 버튼 */}
      <IconButton
        onClick={handleSend}
        disabled={!canSend}
        ariaLabel="메시지 전송"
        iconName="SendFill"
        iconSize="sm"
        buttonSize="sm"
        color="primary"
        variant="fulled"
        isTransparent
      />
    </div>
  );
};

export default MessageInput;
