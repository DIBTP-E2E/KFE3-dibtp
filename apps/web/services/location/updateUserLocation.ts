import { supabaseServerClient } from '@/lib/supabase';

import { createSuccessResult, handleError } from '@/utils';

interface UpdateUserLocationProps {
  userId: string;
  region: string;
  detail_address: string;
}

export const updateUserLocation = async ({
  userId,
  region,
  detail_address,
}: UpdateUserLocationProps) => {
  try {
    const supabase = await supabaseServerClient();

    // users 테이블의 region, detail_address 업데이트
    const { error: updateError } = await supabase
      .from('users')
      .update({
        region,
        detail_address,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select();

    if (updateError) {
      throw updateError;
    }

    return createSuccessResult(`${region}으로 위치가 설정되었습니다!`);
  } catch (error) {
    return handleError(error, '위치 업데이트');
  }
};
