'use client';

import { createPortal } from 'react-dom';

import { cn } from '@ui/utils/cn';

import { useBottomSheetState, useBottomSheetInteractions } from './hooks';

export interface BottomSheetProps {
  /** 바텀시트 열림/닫힘 상태 */
  isOpen: boolean;
  /** 바텀시트 닫기 함수 */
  onClose: () => void;
  /** 바텀시트 내부 콘텐츠 */
  children: React.ReactNode;
  /** 바텀시트 제목 */
  title?: string;
  /** 바텀시트 커스텀 클래스 */
  className?: string;
  /** 오버레이 커스텀 클래스 */
  overlayClassName?: string;
  /** 바텀시트 높이 설정 */
  height?: 'auto' | 'full' | number;
  /** 상단 핸들 표시 여부 */
  showHandle?: boolean;
  /** 백드롭 클릭으로 닫기 방지 */
  preventBackdropClose?: boolean;
  /** 접근성을 위한 aria-label */
  'aria-label'?: string;
}

const BottomSheet = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  overlayClassName,
  height = 'auto',
  showHandle = true,
  preventBackdropClose = false,
  'aria-label': ariaLabel,
}: BottomSheetProps) => {
  // 바텀시트 상태 및 기본 동작 관리
  const { shouldRender, isAnimating, sheetRef } = useBottomSheetState(isOpen, onClose);

  // 터치 제스처 및 백드롭 클릭 처리
  const { handleTouchStart, handleBackdropClick } = useBottomSheetInteractions(
    showHandle,
    preventBackdropClose,
    onClose
  );

  // 높이 클래스 계산 함수
  const getHeightClass = () => {
    if (height === 'full') return 'h-full';
    if (height === 'auto') return 'h-auto max-h-[90vh]';
    if (typeof height === 'number') return `h-[${height}px]`;
    return 'h-auto max-h-[90vh]';
  };

  if (!shouldRender) return null;

  const bottomSheetContent = (
    <div
      className={cn('fixed inset-0 z-50 flex items-end justify-center', overlayClassName)}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title || 'Bottom Sheet'}
    >
      {/* 백드롭 */}
      <div
        className={cn(
          'absolute inset-0 bg-bg-dark/50 backdrop-blur-sm transition-opacity duration-300',
          isAnimating ? 'opacity-100' : 'opacity-0'
        )}
        onClick={handleBackdropClick}
      />

      {/* 바텀시트 */}
      <div
        ref={sheetRef}
        className={cn(
          'relative w-full bg-bg-light rounded-t-xl shadow-lg transform transition-transform duration-300 ease-out flex flex-col',
          getHeightClass(),
          isAnimating ? 'translate-y-0' : 'translate-y-full',
          className
        )}
        onTouchStart={handleTouchStart}
      >
        {/* 핸들 */}
        {showHandle && (
          <div className="flex justify-center pt-sm pb-xs">
            <div className="w-10 h-1 bg-border-base rounded-full" />
          </div>
        )}

        {/* 제목 */}
        {title && (
          <div className="px-container py-sm border-b border-border-base">
            <h2 className="font-style-large text-text-base text-center">{title}</h2>
          </div>
        )}

        {/* 콘텐츠 */}
        <div
          className={cn(
            'px-container',
            title ? 'pt-md' : showHandle ? 'pt-xs' : 'pt-md',
            'pb-md overflow-y-auto flex-1 min-h-0'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );

  // 포털을 통해 렌더링
  if (typeof document !== 'undefined') {
    return createPortal(bottomSheetContent, document.body);
  }

  return null;
};

export default BottomSheet;
