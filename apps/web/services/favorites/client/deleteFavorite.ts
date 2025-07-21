import { API_ROUTES } from '@/constants';

interface FavoriteData {
  userId: string;
  productId: number;
}

export const deleteFavorite = async (favoriteData: FavoriteData): Promise<void> => {
  const response = await fetch(API_ROUTES.FAVORITES, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(favoriteData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || '찜 취소에 실패했습니다.');
  }
};
