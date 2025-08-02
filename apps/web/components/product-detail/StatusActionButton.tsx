'use client';

import { useState } from 'react';

import { Button, ActionSheet, Icon } from '@repo/ui/components';

import {
  PRODUCT_STATUS_ACTION_LABELS,
  PRODUCT_STATUS_LABELS,
  PRODUCT_STATUS_MESSAGES,
} from '@web/constants';
import { useProductActions, useProductActionMenu } from '@web/hooks';
import type { ProductStatus } from '@web/types';

interface StatusActionButtonProps {
  productId: number;
  productTitle: string;
  currentStatus: ProductStatus;
  sellerUserId: string;
  currentUserId: string;
}

const StatusActionButton = ({
  productId,
  productTitle,
  currentStatus,
  sellerUserId,
  currentUserId,
}: StatusActionButtonProps) => {
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isStatusChanging, setIsStatusChanging] = useState(false);

  const { handleStartAuction, handleStopAuction } = useProductActions({
    productId,
    title: productTitle,
  });

  const { getStatusChangeActions } = useProductActionMenu({
    status: currentStatus,
    handlers: {
      handleStartAuction,
      handleStopAuction,
    },
  });

  // 판매자가 아니면 렌더링하지 않음
  if (currentUserId !== sellerUserId) {
    return null;
  }

  const statusActions = getStatusChangeActions();

  // 변경 가능한 상태가 없으면 렌더링하지 않음
  if (statusActions.length === 0) {
    return null;
  }

  return (
    <>
      <Button
        color="lightMode"
        variant="outlined"
        size="sm"
        isFullWidth={false}
        disabled={isStatusChanging}
        onClick={() => setIsActionSheetOpen(true)}
      >
        {isStatusChanging ? '변경 중...' : PRODUCT_STATUS_LABELS[currentStatus]}
        <Icon name="ArrowDown" size="sm" />
      </Button>

      <ActionSheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        aria-label="경매 상태 변경"
        items={statusActions.map((action) => ({
          ...action,
          onClick: async () => {
            setIsStatusChanging(true);
            setIsActionSheetOpen(false);
            try {
              await action.onClick();
              const message =
                action.label === PRODUCT_STATUS_ACTION_LABELS.START_AUCTION
                  ? PRODUCT_STATUS_MESSAGES.AUCTION_STARTED
                  : PRODUCT_STATUS_MESSAGES.AUCTION_STOPPED;
              alert(message);
              window.location.reload();
            } catch {
              alert(PRODUCT_STATUS_MESSAGES.STATUS_CHANGE_FAILED);
            } finally {
              setIsStatusChanging(false);
            }
          },
        }))}
      />
    </>
  );
};

export default StatusActionButton;
