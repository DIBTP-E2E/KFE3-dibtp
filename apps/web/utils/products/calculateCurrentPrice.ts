export const calculateCurrentPrice = (
  startPrice: number,
  minPrice: number,
  decreaseUnit: number,
  auctionStartedAt: string,
  decreaseInterval: number
): number => {
  const createdDate = new Date(auctionStartedAt);
  const now = new Date();

  const timeDiffSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

  if (timeDiffSeconds < 0) {
    return startPrice;
  }

  const numberOfDecreases = Math.floor(timeDiffSeconds / decreaseInterval);

  let currentPrice = startPrice - numberOfDecreases * decreaseUnit;

  // 최저가보다 낮아지지 않도록 보정
  if (currentPrice < minPrice) {
    currentPrice = minPrice;
  }

  return currentPrice;
};
