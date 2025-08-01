'use client';

import { toast } from '@repo/ui/utils';

import { useAppNavigation } from '@web/hooks';
import { supabaseClient } from '@web/lib/supabase/client';

const LogoutButton = () => {
  const { goToLogin } = useAppNavigation();

  const handleLogout = async () => {
    // 추후 바텀시트 컴포넌트로 대체
    if (confirm('로그아웃 하시겠습니까?')) {
      try {
        await supabaseClient.auth.signOut();
        goToLogin();
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('로그아웃 실패:', error);
        }

        toast.error('로그아웃 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
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
