import { QueryClient } from '@tanstack/react-query';

// 서버 전용 QueryClient 생성 함수
export function createServerQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false, // 서버에서는 재시도 비활성화
      },
    },
  });
}

// 서버 컴포넌트에서 사용할 수 있는 공통 prefetch 함수
export async function prefetchUserRegion(queryClient: QueryClient) {
  const { getUserRegion } = await import('@/utils/user/server');

  await queryClient.prefetchQuery({
    queryKey: ['user-region'],
    queryFn: getUserRegion,
  });
}
