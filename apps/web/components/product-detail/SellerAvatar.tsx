import { Avatar } from '@repo/ui/components';

interface SellerAvatarProps {
  profileImage: string;
}

const SellerAvatar = ({ profileImage }: SellerAvatarProps) => {
  return <Avatar src={profileImage} alt="Seller Avatar" size="lg" />;
};

export default SellerAvatar;
