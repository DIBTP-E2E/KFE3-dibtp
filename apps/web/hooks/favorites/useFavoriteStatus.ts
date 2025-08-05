'use client';

import { useEffect, useState } from 'react';

import {
  fetchFavoriteStatus,
  createFavorite,
  deleteFavorite,
} from '@web/services/favorites/client';

interface UseFavoriteStatusProps {
  productId: number;
}

export const useFavoriteStatus = ({ productId }: UseFavoriteStatusProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeFavoriteStatus = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { isFavorite } = await fetchFavoriteStatus(productId);
        setIsLiked(isFavorite);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to fetch favorite status:', err);
        }
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setIsLiked(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeFavoriteStatus();
  }, [productId]);

  const toggleFavorite = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      if (isLiked) {
        await deleteFavorite(productId);
        setIsLiked(false);
      } else {
        await createFavorite(productId);
        setIsLiked(true);
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('찜하기 토글 실패:', err);
      }
      setError(err instanceof Error ? err : new Error('An unknown error occurred during toggle'));
    } finally {
      setIsLoading(false);
    }
  };

  return { isLiked, isLoading, error, toggleFavorite };
};
