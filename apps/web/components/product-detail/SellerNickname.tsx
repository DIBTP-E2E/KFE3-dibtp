interface SellerNicknameProps {
  nickname: string;
}

const SellerNickname = ({ nickname }: SellerNicknameProps) => {
  return <span className="font-semibold text-gray-800">{nickname}</span>;
};

export default SellerNickname;
