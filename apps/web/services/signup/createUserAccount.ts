import { supabaseServerClient } from '@/lib/supabase';

interface CreateUserAccountProps {
  email: string;
  password: string;
  nickname: string;
}

export async function createUserAccount({ email, password, nickname }: CreateUserAccountProps) {
  const supabase = await supabaseServerClient();

  // 닉네임 중복 검사
  const { data: existingUser, error: selectError } = await supabase
    .from('users')
    .select('nickname')
    .eq('nickname', nickname)
    .maybeSingle();

  if (selectError) throw new Error('db_error');
  if (existingUser) throw new Error('duplicate_nickname');

  // 회원가입
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signupError?.message === 'User already registered') {
    throw new Error('duplicate_email');
  }
  if (signupError) throw new Error('auth_error');

  const user = signupData.user;
  if (!user) throw new Error('user_not_returned');

  // 유저 테이블에 삽입
  const { error: insertError } = await supabase.from('users').insert([
    {
      user_id: user.id,
      nickname,
      created_at: new Date().toISOString(),
    },
  ]);

  if (insertError) throw new Error('insert_error');

  return { user };
}
