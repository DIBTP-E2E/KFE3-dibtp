'use client';

import { useState } from 'react';

import { IconButton } from '@repo/ui/components';
import { toast } from '@repo/ui/utils';
import { useParams } from 'next/navigation';

import { createFavorite, deleteFavorite } from '@web/services/favorites/client';

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
      setIsLiked(previousIsLiked);

      const errorMassage =
        error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      toast.error(errorMassage);

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('찜하기 실패:', error);
      }
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
