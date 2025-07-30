import type { QueryClient } from '@tanstack/react-query';

import { MY_INFO_QUERY_KEY } from '@web/constants';
import { getMyInfo } from '@web/services/my-info/server';

// 서버 컴포넌트에서 사용할 수 있는 my data 정보 관련된 prefetch 함수 모음

export async function prefetchMyInfo(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: MY_INFO_QUERY_KEY,
    queryFn: getMyInfo,
  });
}
