import { cache } from 'react';

import { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { fetchProductDetailWithPrisma } from '@/services/products/server';

import {
  ProductDetailHeader,
  ProductImageCarousel,
  ProductTitle,
  AuctionInfoLayout,
  ProductDescription,
  ProductFooter,
  UserInfoLayout,
} from '@/components/product-detail';

import { calculateCurrentPrice } from '@/utils/common/calculateCurrentPrice';

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

  const images = product.product_images.map((image) => image.image_url);
  const currentPrice = calculateCurrentPrice(
    product.start_price,
    product.min_price,
    product.decrease_unit,
    product.created_at
  );

  return (
    <section className="mx-auto w-full md:max-w-container pb-20">
      {/* 푸터 높이만큼 하단 패딩 추가 */}
      <ProductDetailHeader />
      <ProductImageCarousel images={images} />
      {/* 여기에 상품 상세 정보 컴포넌트들이 추가될 예정 */}
      <div className="p-4">
        <ProductTitle title={product.title} />
        <UserInfoLayout
          sellerNickname="판매자 닉네임 (목데이터)" // 실제 데이터 사용 시 mockProduct.seller_nickname 등으로 변경
          sellerAvatarUrl="https://picsum.photos/seed/seller/200/200" // 실제 데이터 사용 시 변경
        />
        <AuctionInfoLayout
          decreaseUnit={product.decrease_unit}
          startPrice={product.start_price}
          minPrice={product.min_price}
          createdAt={product.created_at}
        />
        <ProductDescription description={product.description} />
      </div>
      <ProductFooter
        productId={product.product_id}
        currentPrice={currentPrice}
        minPrice={product.min_price}
        createdAt={product.created_at}
      />
    </section>
  );
};

export default ProductDetailPage;
