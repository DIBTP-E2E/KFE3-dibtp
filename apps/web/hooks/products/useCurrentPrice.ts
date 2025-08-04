'use client';

import { useState, useEffect } from 'react';

import { calculateCurrentPrice } from '@/utils/products';
import { PRODUCT_STATUS } from '@web/constants';
import type { ProductStatus } from '@web/types';

interface AuctionPriceInfo {
  startPrice: number;
  minPrice: number;
  decreaseUnit: number;
  auctionStartedAt: string;
  status: ProductStatus;
}

export const useCurrentPrice = ({
  startPrice,
  minPrice,
  decreaseUnit,
  auctionStartedAt,
  status,
}: AuctionPriceInfo): number => {
  const [currentPrice, setCurrentPrice] = useState<number>(() => {
    if (status !== PRODUCT_STATUS.ACTIVE) {
      return startPrice;
    }
    return calculateCurrentPrice(startPrice, minPrice, decreaseUnit, auctionStartedAt);
  });

  useEffect(() => {
    if (status !== PRODUCT_STATUS.ACTIVE) {
      setCurrentPrice(startPrice);
      return;
    }

    const timer = setInterval(() => {
      const newPrice = calculateCurrentPrice(startPrice, minPrice, decreaseUnit, auctionStartedAt);

      // 가격이 실제로 변했을 때만 상태 업데이트
      setCurrentPrice((prevPrice) => (prevPrice !== newPrice ? newPrice : prevPrice));
    }, 1000); // 1초마다 가격 확인

    return () => clearInterval(timer);
  }, [startPrice, minPrice, decreaseUnit, auctionStartedAt, status]);

  return currentPrice;
};
