import { NextResponse } from 'next/server';

import { setServerSession } from '../../../services/login/setServerSession';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    await setServerSession(email, password);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 401 });
  }
}
