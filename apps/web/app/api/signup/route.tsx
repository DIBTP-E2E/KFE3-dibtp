import { NextResponse } from 'next/server';

import { setServerSession } from '../../../services/login/setServerSession';
import { createUserAccount } from '../../../services/signup/createUserAccount';

export async function POST(req: Request) {
  try {
    const { email, password, nickname } = await req.json();

    // 회원가입 처리
    const user = await createUserAccount({ email, password, nickname });

    // 세션 설정 (자동 로그인)
    await setServerSession(email, password);

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
