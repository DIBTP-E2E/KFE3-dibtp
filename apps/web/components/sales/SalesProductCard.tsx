'use client';

import { useState, useCallback } from 'react';

import { ActionSheet, IconButton } from '@repo/ui/components';

import { useProductActions, useProductActionMenu } from '@web/hooks';

import type { ProductStatus } from '@web/types';

import ProductCard from '../products/ProductCard';

interface SalesProductCardProps {
  productId: number;
  imgUrl: string;
  title: string;
  startPrice: number;
  minPrice: number;
  decreaseUnit: number;
  auctionStartedAt: string;
  status: ProductStatus;
  region: string;
  detailAddress: string;
  createdAt: string;
}

const SalesProductCard = ({
  productId,
  imgUrl,
  title,
  startPrice,
  minPrice,
  decreaseUnit,
  auctionStartedAt,
  status,
  region,
  detailAddress,
  createdAt,
}: SalesProductCardProps) => {
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);

  const productActions = useProductActions({ productId, title });

  // 에러 핸들링이 포함된 래퍼 함수들 - useCallback으로 최적화
  const handleWithErrorHandling = useCallback(
    (action: () => Promise<void>) => async () => {
      try {
        await action();
      } catch (error) {
        // TODO: 통합 에러 토스트 시스템으로 교체
        console.error('액션 실행 실패:', error);
      }
    },
    []
  );

  const handlers = useCallback(
    () => ({
      handleEdit: productActions.handleEdit,
      handleShare: handleWithErrorHandling(productActions.handleShare),
      handleDelete: handleWithErrorHandling(productActions.handleDelete),
      handleStartAuction: handleWithErrorHandling(productActions.handleStartAuction),
      handleStopAuction: handleWithErrorHandling(productActions.handleStopAuction),
    }),
    [productActions, handleWithErrorHandling]
  );

  const { getActionItems } = useProductActionMenu({ status, handlers: handlers() });

  const handleMeatballClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsActionSheetOpen(true);
  }, []);

  return (
    <>
      <article className="relative flex items-center justify-between gap-md">
        <ProductCard
          productId={productId}
          imgUrl={imgUrl}
          title={title}
          startPrice={startPrice}
          minPrice={minPrice}
          decreaseUnit={decreaseUnit}
          auctionStartedAt={auctionStartedAt}
          status={status}
          region={region}
          detailAddress={detailAddress}
          createdAt={createdAt}
          isShowProductBadge={false}
        />

        {/* 미트볼 버튼 */}
        <div className="flex-shrink-0 self-start">
          <IconButton
            iconName="MoreVert"
            iconSize="xs"
            buttonSize="xs"
            color="lightMode"
            variant="fulled"
            onClick={handleMeatballClick}
            ariaLabel="상품 옵션 메뉴"
          />
        </div>
      </article>

      {/* 액션시트 */}
      <ActionSheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        items={getActionItems()}
        title="상품 관리"
      />
    </>
  );
};

export default SalesProductCard;
