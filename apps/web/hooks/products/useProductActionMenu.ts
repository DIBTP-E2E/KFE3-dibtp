'use client';

import { PRODUCT_STATUS } from '@web/constants';
import type { ProductStatus } from '@web/types';

interface ActionItem {
  label: string;
  onClick: () => void;
  variant?: 'danger';
}

interface UseProductActionMenuProps {
  status: ProductStatus;
  handlers: {
    handleEdit: () => void;
    handleShare: () => void;
    handleDelete: () => void;
    handleStartAuction: () => void;
    handleStopAuction: () => void;
  };
}

export const useProductActionMenu = ({ status, handlers }: UseProductActionMenuProps) => {
  const { handleEdit, handleShare, handleDelete, handleStartAuction, handleStopAuction } = handlers;

  const getActionItems = (): ActionItem[] => {
    const baseActions: ActionItem[] = [
      {
        label: '공유하기',
        onClick: handleShare,
      },
    ];

    switch (status) {
      case PRODUCT_STATUS.READY:
        return [
          {
            label: '수정하기',
            onClick: handleEdit,
          },
          {
            label: '경매 시작',
            onClick: handleStartAuction,
          },
          ...baseActions,
          {
            label: '삭제하기',
            variant: 'danger',
            onClick: handleDelete,
          },
        ];

      case PRODUCT_STATUS.ACTIVE:
        return [
          {
            label: '경매 중단',
            variant: 'danger',
            onClick: handleStopAuction,
          },
          ...baseActions,
        ];

      case PRODUCT_STATUS.SOLD:
        return baseActions;

      case PRODUCT_STATUS.CANCEL:
        return [
          {
            label: '경매 진행중으로 변경',
            onClick: handleStartAuction,
          },
          ...baseActions,
          {
            label: '삭제하기',
            variant: 'danger',
            onClick: handleDelete,
          },
        ];

      default:
        return baseActions;
    }
  };

  return { getActionItems };
};
