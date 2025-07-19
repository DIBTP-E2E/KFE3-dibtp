import { NextResponse } from 'next/server';

import { getUserRegion } from '@/services/user/server';

export async function GET() {
  try {
    const region = await getUserRegion();

    return NextResponse.json({ region });
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch user region: ${error}` }, { status: 500 });
  }
}
