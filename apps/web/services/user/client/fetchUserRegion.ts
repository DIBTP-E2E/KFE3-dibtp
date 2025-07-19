import { API_ROUTES } from '@/constants';

// 클라이언트 컴포넌트에서 사용할 query 함수들

export async function fetchUserRegion(): Promise<string | null> {
  try {
    const response = await fetch(`${API_ROUTES.USER}/region`);

    if (!response.ok) {
      throw new Error('Failed to fetch user region');
    }

    const data = await response.json();

    return data.region;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error fetching user region:', error);
    }
    return null;
  }
}
