import { Avatar, IconButton } from '@repo/ui/components';
import Link from 'next/link';

import { PAGE_ROUTES } from '@web/constants/routes';

interface ProfileBannerProps {
  userNickname: string;
  userProfileImage: string;
}

const ProfileBanner = ({ userNickname, userProfileImage }: ProfileBannerProps) => {
  return (
    <div className="bg-gradient-to-br from-orange-200 via-orange-400 to-bg-primary px-md py-md rounded-lg shadow-sm">
      <div className="flex items-center gap-md">
        <Avatar
          className="bg-white border-white/30"
          src={userProfileImage}
          alt="프로필 이미지"
          size="xl"
        />
        <h1 className="block py-sm font-style-headline-h4 flex-1 truncate text-white drop-shadow-sm">
          {userNickname}
        </h1>
        <Link href={PAGE_ROUTES.MYPAGE.PROFILE}>
          <IconButton
            iconName="SettingFill"
            buttonSize="md"
            iconSize="md"
            color="lightMode"
            variant="fulled"
            isTransparent={true}
            className="text-text-inverse"
            ariaLabel="유저 정보 수정 페이지로 이동"
          />
        </Link>
      </div>
    </div>
  );
};

export default ProfileBanner;
