'use client';

import { useRouter } from 'next/navigation';

import { supabaseClient } from '@/lib/supabase/client';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // 추후 바텀시트 컴포넌트로 대체
    if (confirm('로그아웃 하시겠습니까?')) {
      try {
        await supabaseClient.auth.signOut();
        router.push('/login');
      } catch (error) {
        console.error('로그아웃 중 오류가 발생했습니다:', error);
        alert('로그아웃 중 오류가 발생했습니다. 다시 시도해 주세요.');
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
