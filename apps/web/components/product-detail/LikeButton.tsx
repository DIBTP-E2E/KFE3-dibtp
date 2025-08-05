'use client';

import { IconButton } from '@repo/ui/components';
import { toast, cn } from '@repo/ui/utils';

import { useParams } from 'next/navigation';

import { SkeletonBox } from '@web/components/shared';

import { useFavoriteStatus } from '@web/hooks/favorites/useFavoriteStatus';

interface LikeButtonProps {
  className?: string;
}

const LikeButton = ({ className }: LikeButtonProps) => {
  const { productId: productIdParam } = useParams();
  const productId = parseInt(productIdParam as string, 10);

  const { isLiked, isLoading, error, toggleFavorite } = useFavoriteStatus({ productId });

  const handleClick = async () => {
    await toggleFavorite();
    if (error) {
      toast.error(error.message || '찜하기 처리에 실패했습니다.');
    }
  };

  if (isLoading) {
    return <SkeletonBox className={cn('w-[40px] h-[40px] rounded-full', className)} />;
  }

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
      className={cn(isLiked ? 'text-text-primary' : '', className)}
    />
  );
};

export default LikeButton;
