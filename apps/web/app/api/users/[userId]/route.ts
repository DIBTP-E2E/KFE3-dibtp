import { NextResponse } from 'next/server';

import { getUserInfo } from '@web/services/users/server';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const userInfo = await getUserInfo(params.userId);
    return NextResponse.json(userInfo);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Failed to get user info' }), {
      status: 500,
    });
  }
}
