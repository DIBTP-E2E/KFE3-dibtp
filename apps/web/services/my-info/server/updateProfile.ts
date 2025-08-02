import { prisma } from '@web/lib/prisma/prisma';

interface UpdateProfileArgs {
  userId: string;
  nickname?: string;
  profileImageUrl?: string | null;
}

export const updateProfile = async ({ userId, nickname, profileImageUrl }: UpdateProfileArgs) => {
  try {
    const dataToUpdate: { nickname?: string; profile_image?: string | null } = {};

    if (nickname !== undefined) {
      // 닉네임 유효성 검사 (빈 값 허용 안 함)
      if (!nickname.trim()) {
        throw new Error('닉네임은 필수 입력 항목입니다.');
      }
      // 기존 닉네임과 다른 경우에만 업데이트
      const currentUser = await prisma.users.findUnique({
        where: { user_id: userId },
        select: { nickname: true },
      });

      if (currentUser && currentUser.nickname !== nickname) {
        // 닉네임 중복 검사
        const existingUser = await prisma.users.findFirst({
          where: { nickname: nickname },
        });
        if (existingUser && existingUser.user_id !== userId) {
          throw new Error('이미 사용 중인 닉네임입니다.');
        }
        dataToUpdate.nickname = nickname;
      }
    }

    if (profileImageUrl !== undefined) {
      dataToUpdate.profile_image = profileImageUrl;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return { success: true, message: '변경할 내용이 없습니다.' };
    }

    const updatedUser = await prisma.users.update({
      where: { user_id: userId },
      data: dataToUpdate,
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('프로필 업데이트 실패:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    };
  }
};
