export const deleteFavorite = async (productId: number) => {
  const response = await fetch('/api/favorites', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '찜하기 취소에 실패했습니다.');
  }

  return response.json();
};
