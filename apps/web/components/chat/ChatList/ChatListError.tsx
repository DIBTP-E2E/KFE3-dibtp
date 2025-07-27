import { Button } from '@repo/ui/components';
import { cn } from '@repo/ui/utils/cn';

interface ChatListErrorProps {
  onClick: () => void;
  className?: string;
}

const ChatListError = ({ onClick, className }: ChatListErrorProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center h-full', className)}>
      <div className="text-center py-12">
        <h3 className="font-style-headline-h4 mb-2">채팅을 불러올 수 없습니다.</h3>
        <p className="mb-4">네트워크 연결을 확인하고 다시 시도해주세요.</p>
        <Button onClick={() => onClick()}>다시 시도</Button>
      </div>
    </div>
  );
};

export default ChatListError;
