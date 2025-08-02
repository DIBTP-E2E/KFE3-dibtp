'use client';

import type { ActionSheetItem } from '@repo/ui/components';

import { PRODUCT_STATUS, PRODUCT_STATUS_ACTION_LABELS } from '@web/constants';
import type { ProductStatus } from '@web/types';

interface UseProductActionMenuProps {
  status: ProductStatus;
  handlers?: {
    handleEdit?: () => void;
    handleShare?: () => void;
    handleDelete?: () => void;
    handleStartAuction?: () => void;
    handleStopAuction?: () => void;
  };
}

export const useProductActionMenu = ({ status, handlers = {} }: UseProductActionMenuProps) => {
  const { handleEdit, handleShare, handleDelete, handleStartAuction, handleStopAuction } = handlers;

  const getActionItems = (): ActionSheetItem[] => {
    const actions: ActionSheetItem[] = [];

    switch (status) {
      case PRODUCT_STATUS.ACTIVE:
        if (handleStopAuction) {
          actions.push({
            label: PRODUCT_STATUS_ACTION_LABELS.STOP_AUCTION,
            variant: 'danger',
            onClick: handleStopAuction,
          });
        }
        break;

      case PRODUCT_STATUS.CANCEL:
        if (handleEdit) {
          actions.push({
            label: PRODUCT_STATUS_ACTION_LABELS.EDIT_PRODUCT,
            onClick: handleEdit,
          });
        }
        if (handleStartAuction) {
          actions.push({
            label: PRODUCT_STATUS_ACTION_LABELS.START_AUCTION,
            onClick: handleStartAuction,
          });
        }
        if (handleDelete) {
          actions.push({
            label: PRODUCT_STATUS_ACTION_LABELS.DELETE_PRODUCT,
            variant: 'danger',
            onClick: handleDelete,
          });
        }
        break;
    }

    // 공유하기는 항상 마지막에 추가 (있는 경우)
    if (handleShare) {
      actions.push({
        label: PRODUCT_STATUS_ACTION_LABELS.SHARE_PRODUCT,
        onClick: handleShare,
      });
    }

    return actions;
  };

  // 특정 액션 타입만 필터링하는 헬퍼 함수들
  const getStatusChangeActions = (): ActionSheetItem[] => {
    return getActionItems().filter(
      (item) =>
        item.label === PRODUCT_STATUS_ACTION_LABELS.START_AUCTION ||
        item.label === PRODUCT_STATUS_ACTION_LABELS.STOP_AUCTION
    );
  };

  const getManagementActions = (): ActionSheetItem[] => {
    return getActionItems().filter(
      (item) =>
        item.label === PRODUCT_STATUS_ACTION_LABELS.EDIT_PRODUCT ||
        item.label === PRODUCT_STATUS_ACTION_LABELS.DELETE_PRODUCT
    );
  };

  return {
    getActionItems,
    getStatusChangeActions,
    getManagementActions,
  };
};
