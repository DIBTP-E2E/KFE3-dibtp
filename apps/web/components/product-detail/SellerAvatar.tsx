import { NextAvatar } from '@web/components/shared';

interface SellerAvatarProps {
  profileImage: string;
}

const SellerAvatar = ({ profileImage }: SellerAvatarProps) => {
  return <NextAvatar src={profileImage} alt="Seller Avatar" size="lg" quality={75} />;
};

export default SellerAvatar;
