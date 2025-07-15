import { Avatar, Icon } from '@repo/ui/components';
import Link from 'next/link';

interface MypageHeaderProps {
  userNickname: string;
}

const MypageHeader = ({ userNickname }: MypageHeaderProps) => {
  return (
    <Link href="/profile" className="block">
      <div className="bg-gradient-to-br from-orange-200 via-orange-400 to-bg-primary px-md py-md rounded-lg shadow-sm">
        <div className="flex items-center gap-md">
          <Avatar
            className="bg-white border-white/30"
            src="/images/ddip_logo.png"
            alt="프로필 이미지"
            size="xl"
            name={userNickname}
          />
          <h1 className="block py-sm font-style-headline-h4 flex-1 truncate text-white drop-shadow-sm">
            {userNickname}
          </h1>
          <Icon name="ArrowRight" size="md" color="inverse" />
        </div>
      </div>
    </Link>
  );
};

export default MypageHeader;
