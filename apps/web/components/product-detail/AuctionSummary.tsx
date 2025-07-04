interface AuctionSummaryProps {
  startPrice: number;
  decreaseUnit: number;
  minPrice: number;
}

const AuctionSummary = ({ startPrice, decreaseUnit, minPrice }: AuctionSummaryProps) => {
  const summaryItems = [
    { label: '경매 시작가', value: startPrice },
    { label: '인하 단위 가격', value: decreaseUnit },
    { label: '하한가', value: minPrice },
  ];

  return (
    <div className="border border-gray-300 rounded-md p-4 space-y-2">
      {summaryItems.map((item) => (
        <div key={item.label} className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{item.label}</span>
          <span className="text-base font-semibold text-gray-500">
            {item.value.toLocaleString()}원
          </span>
        </div>
      ))}
    </div>
  );
};

export default AuctionSummary;
