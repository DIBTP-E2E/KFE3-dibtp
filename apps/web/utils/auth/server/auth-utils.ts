import { supabaseServerClient } from '@/lib/supabase/server';

import { handleError } from '@/utils/error';

interface AuthResult {
  success: boolean;
  userId?: string;
  email?: string;
  error?: string;
}

// 로그인한 유저의 세션 정보 반환
// 꼭 서버 환경에서 사용!!
export const getAuthenticatedUser = async (): Promise<AuthResult> => {
  console.time('⏰ getAuthenticatedUser');

  try {
    console.time('⏰ getAuthenticatedUser - supabaseServerClient()');

    const supabase = await supabaseServerClient();

    console.timeEnd('⏰ getAuthenticatedUser - supabaseServerClient()');

    console.time('⏰ getAuthenticatedUser - supabase.auth.getUser');

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    console.timeEnd('⏰ getAuthenticatedUser - supabase.auth.getUser');

    if (error || !user) {
      return handleError(error, '인증 확인');
    }

    return {
      success: true,
      userId: user.id,
      email: user.email,
    };
  } catch (error) {
    return handleError(error, '인증 확인');
  } finally {
    console.timeEnd('⏰ getAuthenticatedUser');
  }
};
