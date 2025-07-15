import { notFound } from 'next/navigation';

import { prisma } from '@/lib/prisma';

import {
  ActivityStats,
  MypageHeader,
  SettingsMenu,
  TradingMenu,
  LogoutButton,
} from '@/components/mypage';

import { getAuthenticatedUser } from '@/utils/auth/server';

const ProfilePage = async () => {
  const authResult = await getAuthenticatedUser();

  // 사용자 정보 조회
  const user = await prisma.users.findUnique({
    where: { user_id: authResult.userId },
    select: {
      nickname: true,
    },
  });

  // 사용자 정보가 없으면 404 페이지로 이동
  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-md">
      <MypageHeader userNickname={user.nickname} />

      <ActivityStats />

      <TradingMenu />

      <SettingsMenu />

      <div className="mt-md text-center">
        <LogoutButton />
      </div>
    </div>
  );
};

export default ProfilePage;
