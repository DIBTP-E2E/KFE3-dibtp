'use client';

import { BottomSheet } from '@ui/components';
import type { BottomSheetProps } from '@ui/components';
import { cn } from '@ui/utils/cn';

export interface ActionSheetItem {
  /** 표시될 라벨 텍스트 */
  label: string;
  /** 아이템 스타일 변형 */
  variant?: 'default' | 'danger';
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 클릭 시 실행될 함수 */
  onClick: () => void;
}

export interface ActionSheetProps extends Omit<BottomSheetProps, 'children'> {
  /** 액션 아이템 목록 */
  items: ActionSheetItem[];
  /** 취소 버튼 라벨 */
  cancelLabel?: string;
  /** 취소 버튼 표시 여부 */
  showCancel?: boolean;
  /** 취소 버튼 클릭 시 실행될 함수 */
  onCancel?: () => void;
  /** 아이템 버튼 커스텀 클래스 */
  itemClassName?: string;
  /** 취소 버튼 커스텀 클래스 */
  cancelClassName?: string;
}

const ActionSheet = ({
  items,
  cancelLabel = '취소',
  showCancel = true,
  onCancel,
  itemClassName,
  cancelClassName,
  onClose,
  portalContainer,
  ...bottomSheetProps
}: ActionSheetProps) => {
  // 아이템 클릭 처리
  const handleItemClick = (item: ActionSheetItem) => {
    if (!item.disabled) {
      item.onClick();
      onClose();
    }
  };

  // 취소 버튼 클릭 처리
  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  return (
    <BottomSheet
      {...bottomSheetProps}
      onClose={onClose}
      showHandle={false}
      portalContainer={portalContainer}
      className={bottomSheetProps.className}
    >
      <div className="space-y-xs">
        {/* 액션 아이템들 */}
        {items.map((item, index) => (
          <button
            key={`${item.label}-${index}`}
            onClick={() => handleItemClick(item)}
            disabled={item.disabled}
            className={cn(
              'w-full flex items-center justify-center px-container py-md',
              'font-style-medium text-center rounded-lg transition-colors',
              // 기본 스타일
              item.variant === 'danger'
                ? 'text-text-danger bg-bg-danger/10'
                : 'text-text-base bg-bg-light',
              // 비활성화 상태
              item.disabled && 'text-text-disabled bg-bg-disabled cursor-not-allowed',
              itemClassName
            )}
          >
            {item.label}
          </button>
        ))}

        {/* 취소 버튼 */}
        {showCancel && (
          <>
            <div className="h-2" />
            <button
              onClick={handleCancelClick}
              className={cn(
                'w-full flex items-center justify-center px-container py-md',
                'font-style-medium text-text-base text-center rounded-lg',
                'bg-bg-base',
                cancelClassName
              )}
            >
              {cancelLabel}
            </button>
          </>
        )}
      </div>
    </BottomSheet>
  );
};

export default ActionSheet;
