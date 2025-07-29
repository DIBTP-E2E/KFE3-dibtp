import { NextRequest, NextResponse } from 'next/server';

import { getUserInfo } from '@web/services/users/server';

interface RouteParams {
  params: Promise<{
    userId: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await params;
    const userInfo = await getUserInfo(userId);
    return NextResponse.json(userInfo);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Failed to get user info' }), {
      status: 500,
    });
  }
}
