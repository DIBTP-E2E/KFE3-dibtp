'use client';

import { toast } from '@repo/ui/utils';
import { useQueryClient } from '@tanstack/react-query';

import { MY_PRODUCTS_QUERY_KEY, PRODUCT_STATUS_MESSAGES } from '@web/constants';
import { useAppNavigation } from '@web/hooks';
import {
  removeProduct,
  shareProduct,
  startAuction,
  stopAuction,
} from '@web/services/products/client';

interface UseProductActionsProps {
  productId: number;
  title: string;
}

export const useProductActions = ({ productId, title }: UseProductActionsProps) => {
  const { goToProductEdit } = useAppNavigation();
  const queryClient = useQueryClient();

  const invalidateQueries = async () => {
    await queryClient.invalidateQueries({
      queryKey: MY_PRODUCTS_QUERY_KEY.ALL,
    });
  };

  const handleEdit = async () => {
    goToProductEdit(productId.toString());
  };

  const handleShare = async () => {
    try {
      await shareProduct(productId, title);
    } catch (error) {
      toast.error('공유에 실패하였습니다. 다시 시도해주세요.');
      if (process.env.NODE_ENV === 'development') console.error('공유 실패:', error);
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm('정말로 이 상품을 삭제하시겠습니까?');
      if (confirmed) {
        await removeProduct(productId);
        await invalidateQueries();
      }
    } catch (error) {
      toast.error('상품 삭제에 실패하였습니다. 다시 시도해주세요.');
      if (process.env.NODE_ENV === 'development') console.error('삭제 실패:', error);
      throw error;
    }
  };

  const handleStartAuction = async () => {
    try {
      await startAuction(productId);
      await invalidateQueries();
      toast.success(PRODUCT_STATUS_MESSAGES.AUCTION_STARTED);
    } catch (error) {
      toast.error(PRODUCT_STATUS_MESSAGES.STATUS_CHANGE_FAILED);
      if (process.env.NODE_ENV === 'development') console.error('경매 시작 실패:', error);
      throw error;
    }
  };

  const handleStopAuction = async () => {
    try {
      const confirmed = window.confirm('경매를 중단하시겠습니까?');
      if (confirmed) {
        await stopAuction(productId);
        await invalidateQueries();
        toast.success(PRODUCT_STATUS_MESSAGES.AUCTION_STOPPED);
      }
    } catch (error) {
      toast.error(PRODUCT_STATUS_MESSAGES.STATUS_CHANGE_FAILED);
      if (process.env.NODE_ENV === 'development') console.error('경매 중지 실패:', error);
      throw error;
    }
  };

  return {
    handleEdit,
    handleShare,
    handleDelete,
    handleStartAuction,
    handleStopAuction,
  };
};
