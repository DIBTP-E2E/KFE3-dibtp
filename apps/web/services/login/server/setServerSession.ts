import { supabaseServerClient } from '@/lib/supabase/server';

export async function setServerSession(email: string, password: string) {
  const supabase = await supabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error('아이디 또는 비밀번호가 잘못되었습니다.');
  }
}
