import { cache } from 'react';

import { Metadata } from 'next';

import { notFound } from 'next/navigation';

import {
  ProductDetailHeader,
  ProductImageCarousel,
  ProductTitle,
  AuctionInfoLayout,
  ProductDescription,
  ProductFooter,
  UserInfoLayout,
  StatusActionButton,
  ProductAddress,
} from '@web/components/product-detail';
import { getBidByProduct } from '@web/services/bids/server';
import { fetchProductDetailWithPrisma } from '@web/services/products/server';

interface ProductDetailPageParams {
  params: Promise<{ productId: string }>;
}

const getCachedProductDetail = cache(fetchProductDetailWithPrisma);

// 메타데이터 생성 함수
export async function generateMetadata({ params }: ProductDetailPageParams): Promise<Metadata> {
  const { productId: productIdParam } = await params;
  const productId = parseInt(productIdParam);
  const product = await getCachedProductDetail(productId);

  if (!product) {
    return {
      title: '상품을 찾을 수 없습니다',
      description: '요청하신 상품을 찾을 수 없습니다.',
    };
  }

  const title = `${product.title} - DDIP`;
  const description =
    product.description ||
    '띱! 먼저 가져가는 사람이 임자! 하향식 경매 시스템을 통해 중고 물품을 거래할 수 있는 플랫폼입니다.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const ProductDetailPage = async ({ params }: ProductDetailPageParams) => {
  const { productId: productIdParam } = await params;
  const productId = parseInt(productIdParam);

  const product = await getCachedProductDetail(productId);

  if (!product) {
    return notFound();
  }

  const finalBidPrice =
    product.status === 'SOLD' ? (await getBidByProduct(productId))?.bid_price?.toString() : null;

  const images = product.product_images.map((image) => image.image_url);

  return (
    <div className="h-screen flex flex-col">
      <ProductDetailHeader title={product.title} />

      <section className="w-full flex-1 overflow-y-auto">
        {/** 상품 이미지 */}
        <ProductImageCarousel images={images} />

        <div className="px-container py-lg flex flex-col gap-lg">
          <ProductTitle title={product.title} />

          <UserInfoLayout sellerUserId={product.seller_user_id} productId={product.product_id} />

          <AuctionInfoLayout
            decreaseUnit={product.decrease_unit}
            startPrice={product.start_price}
            minPrice={product.min_price}
            startedAt={product.auction_started_at}
            status={product.status}
            finalBidPrice={finalBidPrice}
          />

          <StatusActionButton
            productId={product.product_id}
            productTitle={product.title}
            currentStatus={product.status}
            sellerUserId={product.seller_user_id}
          />

          <ProductAddress region={product.region} detail_address={product.detail_address} />

          <ProductDescription description={product.description} />
        </div>
      </section>

      <ProductFooter
        productId={product.product_id}
        startPrice={product.start_price}
        minPrice={product.min_price}
        decreaseUnit={product.decrease_unit}
        startedAt={product.auction_started_at}
        status={product.status}
        sellerUserId={product.seller_user_id}
        finalBidPrice={finalBidPrice}
      />
    </div>
  );
};

export default ProductDetailPage;
