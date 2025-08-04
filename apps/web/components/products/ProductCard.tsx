'use client';

import { useMemo } from 'react';

import Link from 'next/link';

import { PAGE_ROUTES } from '@/constants';
import { useCurrentPrice } from '@/hooks/products';
import type { ProductStatus } from '@/types';

import { formatRelativeTime } from '@/utils/date';

import ProductThumb from './ProductThumb';

interface ProductCardProps {
  productId: number;
  title: string;
  imgUrl: string;
  startPrice: number;
  minPrice: number;
  decreaseUnit: number;
  auctionStartedAt: string;
  status: ProductStatus;
  viewCount?: number;
  createdAt: string;
  region: string;
  detailAddress: string;
  isShowProductBadge?: boolean;
}

const ProductCard = ({
  productId,
  imgUrl,
  title,
  startPrice,
  minPrice,
  decreaseUnit,
  auctionStartedAt,
  status,
  createdAt,
  region,
  detailAddress,
  isShowProductBadge,
}: ProductCardProps) => {
  const currentPrice = useCurrentPrice({
    startPrice,
    minPrice,
    decreaseUnit,
    auctionStartedAt,
  });

  const shortAddress = detailAddress.split(' ')[0] ?? '';

  return (
    <Link href={PAGE_ROUTES.PRODUCTS.DETAIL(productId.toString())}>
      <article
        className="bg-white flex items-center gap-md p-sm rounded-[20px]"
        aria-label={`${title}, ${status}, 현재가 ${currentPrice}, 지역 ${region}`}
      >
        <ProductThumb
          imgUrl={imgUrl}
          title={title}
          status={status}
          isShowBadge={isShowProductBadge}
          width="w-[80px]"
        />

        <section className="flex flex-col gap-sm">
          <h3 className="font-normal text-base line-clamp-2">{title}</h3>
          <p className="font-style-large">현재가 {currentPrice.toLocaleString()}원</p>
          <p className="text-xs flex items-center gap-xs  text-text-info">
            {region} {shortAddress}
            <i>•</i>
            {formatRelativeTime(createdAt)}
          </p>
        </section>
      </article>
    </Link>
  );
};

export default ProductCard;
