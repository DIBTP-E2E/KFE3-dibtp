'use client';

import { useState } from 'react';

import { Icon } from '@repo/ui/components/Icons';
import { useParams } from 'next/navigation';

import { createFavorite, deleteFavorite } from '@/services/favorites/client';

interface LikeButtonProps {
  initialIsLiked: boolean;
}

const LikeButton = ({ initialIsLiked }: LikeButtonProps) => {
  const { productId: productIdParam } = useParams();
  const productId = parseInt(productIdParam as string, 10);

  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading || !productId) return;

    setIsLoading(true);
    const previousIsLiked = isLiked;

    setIsLiked(!previousIsLiked);

    try {
      if (previousIsLiked) {
        await deleteFavorite(productId);
      } else {
        await createFavorite(productId);
      }
    } catch (error) {
      console.error('찜하기 처리 중 오류 발생:', error);
      setIsLiked(previousIsLiked);
      alert(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
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
