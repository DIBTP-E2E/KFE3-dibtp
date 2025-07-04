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
