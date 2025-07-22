import { API_ROUTES } from '@/constants';

export const createFavorite = async (productId: number) => {
  const response = await fetch(API_ROUTES.FAVORITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '찜하기에 실패했습니다.');
  }

  return response.json();
};
