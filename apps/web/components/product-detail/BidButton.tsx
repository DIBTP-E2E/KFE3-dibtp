'use client';

interface BidButtonProps {
  productId: number;
  currentPrice: number;
}

const BidButton = ({ productId, currentPrice }: BidButtonProps) => {
  const handleBid = async () => {
    try {
      const response = await fetch('/api/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId.toString(),
          bidPrice: currentPrice,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '입찰에 실패했습니다.');
      }

      alert('입찰에 성공했습니다!');
      window.location.reload();
    } catch (error) {
      console.error('입찰 처리 중 오류 발생:', error);
      alert(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <button
      onClick={handleBid}
      className="px-6 py-2 rounded-full bg-bg-primary text-text-inverse text-lg font-semibold"
    >
      입찰하기
    </button>
  );
};

export default BidButton;
