interface NextPriceProps {
  currentPrice: number;
  decreaseUnit: number;
  minPrice: number;
}

const NextPrice = ({ currentPrice, decreaseUnit, minPrice }: NextPriceProps) => {
  const calculatedNextPrice = currentPrice - decreaseUnit;
  const displayPrice = Math.max(calculatedNextPrice, minPrice);

  return (
    <div className="flex flex-col items-center justify-center py-2 px-4 rounded-lg bg-[var(--color-neutral-20)] min-w-[140px]">
      <span className="text-lg font-bold text-[var(--color-neutral-80)]">
        {displayPrice.toLocaleString()}원
      </span>
    </div>
  );
};

export default NextPrice;
