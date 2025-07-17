import { QueryClient } from '@tanstack/react-query';

// 서버 전용 QueryClient 생성 함수
function createServerQueryClient() {
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

export { createServerQueryClient };
