'use client';

import { toast } from '@repo/ui/utils';

import { useAppNavigation } from '@web/hooks';
import { supabaseClient } from '@web/lib/supabase/client';

const LogoutButton = () => {
  const { goToLogin } = useAppNavigation();

  const handleLogout = async () => {
    try {
      await supabaseClient.auth.signOut();
      goToLogin();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('로그아웃 실패:', error);
      }

      toast.error(
        <>
          로그아웃 중 오류가 발생했습니다.
          <br />
          다시 시도해 주세요.
        </>
      );
    }
  };

  return (
    <button
      type="button"
      className="font-style-small text-text-danger underline"
      onClick={handleLogout}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
