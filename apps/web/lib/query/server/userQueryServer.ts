import type { QueryClient } from '@tanstack/react-query';

import { USER_REGION_QUERY_KEY } from '@/constants';

// 서버 컴포넌트에서 사용할 수 있는 공통 prefetch 함수
export async function prefetchUserRegion(queryClient: QueryClient) {
  const { getUserRegion } = await import('@/services/user/server');

  await queryClient.prefetchQuery({
    queryKey: USER_REGION_QUERY_KEY,
    queryFn: async () => {
      // 서버에서 직접 데이터를 가져와서 클라이언트와 동일한 형태로 반환
      const region = await getUserRegion();
      return region;
    },
  });
}
