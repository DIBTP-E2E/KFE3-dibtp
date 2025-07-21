import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '채팅방 - 경매 플랫폼',
  description: '실시간 채팅으로 거래를 진행하세요.',
};

// 채팅 방 페이지
const ChatRoomPage = ({ params }: { params: { chatId: string } }) => {
  return (
    <main>
      <header>
        <h1>채팅방</h1>
      </header>
      <section>{/* 채팅 메시지 목록 */}</section>
      <footer>{/* 메시지 입력 폼 */}</footer>
    </main>
  );
};

export default ChatRoomPage;
