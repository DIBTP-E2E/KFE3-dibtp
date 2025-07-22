import { DECREASE_INTERVAL_SECONDS } from '@/constants/products/product-status';

export const calculateCurrentPrice = (
  startPrice: number,
  minPrice: number,
  decreaseUnit: number,
  auctionStartedAt: string
): number => {
  const createdDate = new Date(auctionStartedAt);
  const now = new Date();

  const timeDiffSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

  if (timeDiffSeconds < 0) {
    return startPrice;
  }

  const numberOfDecreases = Math.floor(timeDiffSeconds / DECREASE_INTERVAL_SECONDS);

  let currentPrice = startPrice - numberOfDecreases * decreaseUnit;

  // 최저가보다 낮아지지 않도록 보정
  if (currentPrice < minPrice) {
    currentPrice = minPrice;
  }

  return currentPrice;
};
