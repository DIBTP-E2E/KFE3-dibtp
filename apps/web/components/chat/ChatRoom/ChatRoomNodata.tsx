import { Icon } from '@repo/ui/components';

const ChatRoomNodata = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center py-md gap-md text-text-info">
      <Icon name="Chat" aria-label="채팅 내역이 존재하지 않습니다" />
      <p className="font-style-large">첫 메시지를 보내보세요!</p>
    </div>
  );
};

export default ChatRoomNodata;
