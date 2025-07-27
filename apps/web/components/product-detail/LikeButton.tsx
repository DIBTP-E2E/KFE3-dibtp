'use client';

import { useState } from 'react';

import { IconButton } from '@repo/ui/components';

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
    <IconButton
      onClick={handleClick}
      disabled={isLoading}
      iconName={isLiked ? 'HeartFill' : 'Heart'}
      ariaLabel="찜하기"
      iconSize="sm"
      buttonSize="sm"
      variant="fulled"
      color="lightMode"
      className={isLiked ? 'text-text-primary' : ''}
    />
  );
};

export default LikeButton;
