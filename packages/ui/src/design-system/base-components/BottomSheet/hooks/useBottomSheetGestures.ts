/**
 * 바텀시트 상호작용(터치, 백드롭 클릭) 처리를 담당하는 훅
 */
export const useBottomSheetInteractions = (
  showHandle: boolean,
  preventBackdropClose: boolean,
  onClose: () => void
) => {
  // 터치 제스처 처리
  const handleTouchStart = (event: React.TouchEvent) => {
    if (!showHandle) return;

    const touch = event.touches[0];
    if (!touch) return;

    const startY = touch.clientY;
    const target = event.target as HTMLElement;

    // 상호작용 요소들에서는 터치 제스처 비활성화
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'BUTTON' ||
      target.tagName === 'SELECT' ||
      target.closest('button') ||
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('select') ||
      target.closest('[role="button"]')
    ) {
      return;
    }

    // 스크롤 가능한 영역에서 스크롤이 맨 위에 있지 않으면 터치 제스처 비활성화
    const scrollableParent = target.closest(
      '.overflow-y-auto, [style*="overflow-y: auto"], [style*="overflow: auto"]'
    ) as HTMLElement;
    if (scrollableParent && scrollableParent.scrollTop > 0) {
      return;
    }

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const currentTouch = moveEvent.touches[0];
      if (!currentTouch) return;

      const currentY = currentTouch.clientY;
      const deltaY = currentY - startY;

      if (deltaY > 100) {
        onClose();
        document.removeEventListener('touchmove', handleTouchMove);
      }
    };

    document.addEventListener('touchmove', handleTouchMove);

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchend', handleTouchEnd);
  };

  // 백드롭 클릭 처리
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (preventBackdropClose) return;

    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return {
    handleTouchStart,
    handleBackdropClick,
  };
};
