import { User } from '@supabase/supabase-js';

import { supabaseServerClient } from '@/lib/supabase';

interface CreateUserAccountProps {
  email: string;
  password: string;
  nickname: string;
}

export async function createUserAccount({
  email,
  password,
  nickname,
}: CreateUserAccountProps): Promise<{ user: User }> {
  const supabase = await supabaseServerClient();

  // 비밀번호 길이 검사
  if (password.length < 6) {
    throw new Error('비밀번호는 6자 이상 입력해주세요.');
  }

  // 닉네임 중복 검사
  const { data: existingUser, error: selectError } = await supabase
    .from('users')
    .select('nickname')
    .eq('nickname', nickname)
    .maybeSingle();

  if (selectError) throw new Error('데이터베이스 오류가 발생했습니다.');
  if (existingUser) throw new Error('이미 사용 중인 닉네임입니다.');

  // 인증 생성
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  });

  // 이메일 중복
  if (signupError?.message === 'User already registered') {
    throw new Error('이미 가입된 이메일입니다.');
  }

  // 기타 오류
  if (signupError) {
    throw new Error('회원가입 중 오류가 발생했습니다.');
  }

  const user = signupData.user;
  if (!user) {
    throw new Error('회원가입 중 오류가 발생했습니다.');
  }

  // 유저 테이블에 삽입
  const { error: insertError } = await supabase.from('users').insert([
    {
      user_id: user.id,
      nickname,
      created_at: new Date().toISOString(),
    },
  ]);

  // 실패해도 사용자에겐 알리지 않음(개발용)
  if (insertError) {
    console.error('[INSERT ERROR]', insertError);
  }

  return { user };
}
