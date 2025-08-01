import { NextResponse } from 'next/server';

import { getMyInfo } from '@web/services/my-info/server';
import { updateProfile } from '@web/services/my-info/server/updateProfile';
import { getAuthenticatedUser } from '@web/utils/auth/server';

export async function GET() {
  try {
    const data = await getMyInfo();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch user region: ${error}` }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const authResult = await getAuthenticatedUser();

  if (!authResult.success || !authResult.userId) {
    return NextResponse.json({ error: authResult.error || 'Unauthorized' }, { status: 401 });
  }

  const userId = authResult.userId;

  const { nickname, profileImageUrl } = await request.json();

  try {
    const updateResult = await updateProfile({
      userId: userId,
      nickname: nickname !== null ? nickname : undefined,
      profileImageUrl: profileImageUrl,
    });

    if (!updateResult.success) {
      return NextResponse.json({ error: updateResult.error }, { status: 400 });
    }

    return NextResponse.json({
      message: '프로필이 성공적으로 업데이트되었습니다.',
      user: updateResult.user,
    });
  } catch (error) {
    console.error('API 프로필 업데이트 오류:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '프로필 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
