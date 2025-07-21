export const getFavoriteStatus = async (productId: number): Promise<{ isFavorite: boolean }> => {
  const response = await fetch(`/api/favorites?productId=${productId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '찜 상태를 불러오는 데 실패했습니다.');
  }

  return response.json();
};
