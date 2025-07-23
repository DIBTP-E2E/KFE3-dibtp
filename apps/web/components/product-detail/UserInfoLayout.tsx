import ChatButton from './ChatButton';
import SellerAvatar from './SellerAvatar';
import SellerNickname from './SellerNickname';

interface UserInfoLayoutProps {
  productId: number;
  sellerUserId: string;
}

const UserInfoLayout = ({ sellerUserId, productId }: UserInfoLayoutProps) => {
  return (
    <div className="flex justify-between items-center mt-4 pb-4 border-b border-border-base">
      <div className="flex items-center gap-2">
        <SellerAvatar sellerUserId={sellerUserId} />
        <SellerNickname sellerUserId={sellerUserId} />
      </div>
      <ChatButton productId={productId} sellerUserId={sellerUserId} />
    </div>
  );
};

export default UserInfoLayout;
