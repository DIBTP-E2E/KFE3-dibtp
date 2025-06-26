'use server';

import { supabaseServerClient } from '@/lib/supabase';

import { handleError } from '../error';

interface AuthResult {
  success: boolean;
  userId?: string;
  error?: string;
}

// 로그인한 유저의 세션 정보 반환
export const getAuthenticatedUser = async (): Promise<AuthResult> => {
  try {
    const supabase = await supabaseServerClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return handleError(error, '인증 확인');
    }

    return {
      success: true,
      userId: user.id,
    };
  } catch (error) {
    return handleError(error, '인증 확인');
  }
};
