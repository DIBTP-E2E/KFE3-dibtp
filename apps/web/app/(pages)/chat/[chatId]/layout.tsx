import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '채팅방 - 경매 플랫폼',
  description: '실시간 채팅으로 거래를 진행하세요.',
};

const ChatRoomLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ChatRoomLayout;
