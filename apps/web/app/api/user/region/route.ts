import { NextResponse } from 'next/server';

import { getUserRegion } from '@/utils/user/server/getUser';

export async function GET() {
  try {
    const region = await getUserRegion();

    return NextResponse.json({ region });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user region' }, { status: 500 });
  }
}
