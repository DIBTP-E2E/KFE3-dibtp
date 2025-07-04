interface BidButtonProps {
  // onClick?: () => void; // 입찰 로직 구현 시 다시 추가
}

const BidButton = ({}: BidButtonProps) => {
  return (
    <button
      // onClick={onClick} // 입찰 로직 구현 시 다시 추가
      className="px-6 py-2 rounded-full bg-bg-primary text-text-inverse text-lg font-semibold"
    >
      입찰하기
    </button>
  );
};

export default BidButton;
