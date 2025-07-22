'use client';

import { useEffect, useState } from 'react';

import { Icon } from '@repo/ui/components/Icons';
import { useParams } from 'next/navigation';

import { createFavorite, deleteFavorite, getFavoriteStatus } from '@/services/favorites/client';

const LikeButton = () => {
  const { productId: productIdParam } = useParams();
  const productId = parseInt(productIdParam as string, 10);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!productId) return;
      try {
        const { isFavorite } = await getFavoriteStatus(productId);
        setIsLiked(isFavorite);
      } catch (error) {
        console.error('찜 상태를 불러오는 데 실패했습니다:', error);
      }
    };

    checkFavorite();
  }, [productId]);

  const handleClick = async () => {
    if (!productId) return;
    try {
      if (isLiked) {
        await deleteFavorite(productId);
      } else {
        await createFavorite(productId);
      }
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error('찜하기 처리 중 오류 발생:', error);
      alert(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-full p-1 flex items-center justify-center bg-white shadow-sm"
    >
      <Icon
        name={isLiked ? 'HeartFill' : 'Heart'}
        size="xs"
        color={isLiked ? 'primary' : 'default'}
      />
    </button>
  );
};

export default LikeButton;
