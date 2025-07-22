import { NextResponse } from 'next/server';

import { getMyInfo } from '@/services/my/server';

export async function GET() {
  try {
    const data = await getMyInfo();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch user region: ${error}` }, { status: 500 });
  }
}
