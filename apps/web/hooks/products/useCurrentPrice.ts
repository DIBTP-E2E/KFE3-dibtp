import { useState, useEffect } from 'react';

import { calculateCurrentPrice } from '@/utils/products';

interface AuctionPriceInfo {
  startPrice: number;
  minPrice: number;
  decreaseUnit: number;
  auctionStartedAt: string;
  decreaseInterval: number;
}

export const useCurrentPrice = ({
  startPrice,
  minPrice,
  decreaseUnit,
  auctionStartedAt,
  decreaseInterval,
}: AuctionPriceInfo): number => {
  const [currentPrice, setCurrentPrice] = useState<number>(() =>
    calculateCurrentPrice(startPrice, minPrice, decreaseUnit, auctionStartedAt, decreaseInterval)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const newPrice = calculateCurrentPrice(
        startPrice,
        minPrice,
        decreaseUnit,
        auctionStartedAt,
        decreaseInterval
      );

      // 가격이 실제로 변했을 때만 상태 업데이트
      setCurrentPrice((prevPrice) => (prevPrice !== newPrice ? newPrice : prevPrice));
    }, 1000); // 1초마다 가격 확인

    return () => clearInterval(timer);
  }, [startPrice, minPrice, decreaseUnit, auctionStartedAt, decreaseInterval]);

  return currentPrice;
};
