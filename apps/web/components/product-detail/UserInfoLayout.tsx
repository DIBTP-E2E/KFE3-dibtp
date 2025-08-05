'use client';

import { SkeletonBox } from '@web/components/shared';
import { useUserInfo } from '@web/hooks/users/useUserInfo';

import ChatButton from './ChatButton';
import SellerAvatar from './SellerAvatar';
import SellerNickname from './SellerNickname';

interface UserInfoLayoutProps {
  productId: number;
  sellerUserId: string;
}

const UserInfoLayout = ({ sellerUserId, productId }: UserInfoLayoutProps) => {
  const { nickname, profileImage, isLoading } = useUserInfo(sellerUserId);

  if (isLoading) {
    return (
      <div className="flex justify-between items-center pb-container border-b border-border-base">
        <div className="flex items-center gap-2">
          <SkeletonBox className="w-10 h-10 rounded-full" />
          <SkeletonBox className="w-24 h-6" />
        </div>
        <SkeletonBox className="w-20 h-10 rounded-md" />
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center pb-container border-b border-border-base">
      <div className="flex items-center gap-2">
        <SellerAvatar profileImage={profileImage} />
        <SellerNickname nickname={nickname} />
      </div>
      <ChatButton productId={productId} sellerUserId={sellerUserId} />
    </div>
  );
};

export default UserInfoLayout;
