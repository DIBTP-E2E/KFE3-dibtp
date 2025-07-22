import { API_ROUTES } from '@web/constants';
import type { MyInfoAPIResponse } from '@web/types';

// 클라이언트 컴포넌트에서 사용할 query 함수들

export async function fetchMyInfo(): Promise<MyInfoAPIResponse> {
  try {
    const response = await fetch(API_ROUTES.MY_INFO);

    if (!response.ok) {
      throw new Error('Failed to fetch user region');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error fetching user region:', error);
    }

    throw new Error('알 수 없는 오류가 발생했습니다');
  }
}
