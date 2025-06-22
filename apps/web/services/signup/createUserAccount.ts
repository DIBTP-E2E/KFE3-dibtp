import { supabase } from '../../lib/supabaseClient';
import { supabaseServer } from '../../lib/supabaseServerClient';

interface CreateUserAccountProps {
  email: string;
  password: string;
  nickname: string;
}

export async function createUserAccount({ email, password, nickname }: CreateUserAccountProps) {
  // NOTE: 닉네임 중복 검사
  const { data: existingUser, error: selectError } = await supabaseServer
    .from('users')
    .select('nickname')
    .eq('nickname', nickname)
    .maybeSingle();

  if (selectError) throw selectError;
  if (existingUser) throw new Error('이미 사용 중인 닉네임입니다.');

  // NOTE: 회원가입(Authentification)
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signupError) throw signupError;

  const user = signupData.user;
  if (!user) throw new Error('회원가입 실패: 사용자 정보 없음');

  // NOTE: users 테이블에 삽입
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
