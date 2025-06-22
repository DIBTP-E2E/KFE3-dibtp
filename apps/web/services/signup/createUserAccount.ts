import { createClient } from '@supabase/supabase-js';

import { supabase } from '../../lib/supabaseClient';

interface CreateUserAccountProps {
  email: string;
  password: string;
  nickname: string;
}

// 서버용 클라이언트
const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function createUserAccount({ email, password, nickname }: CreateUserAccountProps) {
  // 닉네임 중복 검사
  const { data: existingUser, error: selectError } = await supabaseServer
    .from('users')
    .select('nickname')
    .eq('nickname', nickname)
    .maybeSingle();

  if (selectError) throw selectError;
  if (existingUser) throw new Error('이미 사용 중인 닉네임입니다.');

  // 회원가입은 일반 클라이언트로 (클라이언트 사이드 인증을 위해)
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signupError) throw signupError;

  const user = signupData.user;
  if (!user) throw new Error('회원가입 실패: 사용자 정보 없음');

  // users 테이블에 삽입
  const { error: insertError } = await supabaseServer.from('users').insert([
    {
      user_id: user.id,
      nickname,
      created_at: new Date().toISOString(),
    },
  ]);

  if (insertError) throw insertError;

  return { user };
}
