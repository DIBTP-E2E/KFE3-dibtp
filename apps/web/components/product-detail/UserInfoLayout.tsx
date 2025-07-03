
import SellerAvatar from './SellerAvatar';
import SellerNickname from './SellerNickname';
import ChatButton from './ChatButton';

interface UserInfoLayoutProps {
  sellerNickname: string;
  sellerAvatarUrl?: string;
}

const UserInfoLayout = ({ sellerNickname, sellerAvatarUrl }: UserInfoLayoutProps) => {
  return (
    <div className="flex justify-between items-center mt-4 pb-4 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <SellerAvatar avatarUrl={sellerAvatarUrl} />
        <SellerNickname nickname={sellerNickname} />
      </div>
      <ChatButton />
    </div>
  );
};

export default UserInfoLayout;
