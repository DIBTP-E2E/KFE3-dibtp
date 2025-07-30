import { notFound } from 'next/navigation';

import { prisma } from '@/lib/prisma';

import { getAuthenticatedUser } from '@/utils/auth/server';
import {
  ActivityStats,
  SettingsMenu,
  TradingMenu,
  LogoutButton,
  ProfileBanner,
} from '@web/components/mypage';


export const dynamic = 'force-dynamic';

const MyPage = async () => {
  const authResult = await getAuthenticatedUser();

  // 인증 실패 시 404 페이지로 이동
  if (!authResult.success || !authResult.userId) {
    notFound();
  }

  // 사용자 정보 조회
  const user = await prisma.users.findUnique({
    where: { user_id: authResult.userId },
    select: {
      nickname: true,
      profile_image: true,
    },
  });

  // 사용자 정보가 없으면 404 페이지로 이동
  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-md">
      <ProfileBanner userNickname={user.nickname} userProfileImage={user.profile_image ?? ''} />

      <ActivityStats />

      <TradingMenu />

      <SettingsMenu />

      <div className="mt-md text-center">
        <LogoutButton />
      </div>
    </div>
  );
};

export default MyPage;
