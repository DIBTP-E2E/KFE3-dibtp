interface ChatButtonProps {
  // onClick?: () => void; // 채팅 로직 구현 시 다시 추가
}

const ChatButton = ({}: ChatButtonProps) => {
  return (
    <button
      // onClick={onClick} // 채팅 로직 구현 시 다시 추가
      className="px-4 py-2 rounded-full bg-bg-primary text-text-inverse text-sm font-semibold"
    >
      채팅하기
    </button>
  );
};

export default ChatButton;
