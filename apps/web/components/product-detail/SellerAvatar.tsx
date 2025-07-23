'use client';

import { Avatar } from '@repo/ui/components';

import { useUserInfo } from '@web/hooks';

interface SellerAvatarProps {
  sellerUserId: string;
}

const SellerAvatar = ({ sellerUserId }: SellerAvatarProps) => {
  const { profileImage } = useUserInfo(sellerUserId);

  return <Avatar src={profileImage} alt="Seller Avatar" size="lg" />;
};

export default SellerAvatar;
