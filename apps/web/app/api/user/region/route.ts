import { NextResponse } from 'next/server';

import { getUserRegion } from '@/services/user/server';

export async function GET() {
  try {
    const data = await getUserRegion();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch user region: ${error}` }, { status: 500 });
  }
}
