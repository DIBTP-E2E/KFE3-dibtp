import ChatButton from './ChatButton';
import SellerAvatar from './SellerAvatar';
import SellerNickname from './SellerNickname';

interface UserInfoLayoutProps {
  productId: number;
  sellerUserId: string;
  sellerNickname: string;
  sellerAvatarUrl?: string;
}

const UserInfoLayout = ({
  sellerNickname,
  sellerAvatarUrl,
  sellerUserId,
  productId,
}: UserInfoLayoutProps) => {
  return (
    <div className="flex justify-between items-center mt-4 pb-4 border-b border-border-base">
      <div className="flex items-center gap-2">
        <SellerAvatar avatarUrl={sellerAvatarUrl} />
        <SellerNickname nickname={sellerNickname} />
      </div>
      <ChatButton productId={productId} sellerUserId={sellerUserId} />
    </div>
  );
};

export default UserInfoLayout;
