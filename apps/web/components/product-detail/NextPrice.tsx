interface NextPriceProps {
  currentPrice: number;
  decreaseUnit: number;
}

const NextPrice = ({ currentPrice, decreaseUnit }: NextPriceProps) => {
  const nextPrice = currentPrice - decreaseUnit;

  return (
    <div className="flex flex-col items-center justify-center py-2 px-4 rounded-lg bg-[var(--color-neutral-20)] min-w-[140px]">
      <span className="text-lg font-bold text-[var(--color-neutral-80)]">
        {nextPrice.toLocaleString()}원
      </span>
    </div>
  );
};

export default NextPrice;
