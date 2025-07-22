/**
 * 상품 공유
 * @param productId 상품 ID
 * @param title 상품 제목
 */
export const shareProduct = async (productId: number, title: string): Promise<void> => {
  try {
    const productUrl = `${window.location.origin}/products/${productId}`;

    // Web Share API 지원 확인
    if (navigator.share) {
      await navigator.share({
        title: title,
        text: `${title} - DDIP(띱)`,
        url: productUrl,
      });
    } else {
      // 폴백: 클립보드에 복사
      await navigator.clipboard.writeText(productUrl);
      // TODO: 토스트 메시지 표시
      console.log('링크가 클립보드에 복사되었습니다.');
    }
  } catch (error) {
    console.error('공유 오류:', error);
    // 사용자가 공유를 취소한 경우는 에러로 처리하지 않음
    if (error instanceof Error && error.name !== 'AbortError') {
      throw error;
    }
  }
};
