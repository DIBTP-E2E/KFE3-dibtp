'use client';

import { useUserInfo } from '@web/hooks';

interface SellerNicknameProps {
  sellerUserId: string;
}

const SellerNickname = ({ sellerUserId }: SellerNicknameProps) => {
  const { nickname } = useUserInfo(sellerUserId);

  return <span className="font-semibold text-gray-800">{nickname}</span>;
};

export default SellerNickname;
