const PRICE_DECREASE_INTERVAL_MINUTES = 30; // 30분마다 가격 인하

export const calculateCurrentPrice = (
  startPrice: number,
  minPrice: number,
  decreaseUnit: number,
  createdAt: string
): number => {
  const createdDate = new Date(createdAt);
  const now = new Date();

  const timeDiffMinutes = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60));

  const numberOfDecreases = Math.floor(timeDiffMinutes / PRICE_DECREASE_INTERVAL_MINUTES);

  let currentPrice = startPrice - numberOfDecreases * decreaseUnit;

  // 최저가보다 낮아지지 않도록 보정
  if (currentPrice < minPrice) {
    currentPrice = minPrice;
  }

  return currentPrice;
};
