import { notFound } from 'next/navigation';

import { fetchProductDetailWithPrisma } from '@/services/products';

import {
  ProductDetailHeader,
  ProductImageCarousel,
  ProductTitle,
  AuctionInfoLayout,
  ProductDescription,
  ProductFooter,
  UserInfoLayout,
} from '@/components/product-detail';

const ProductDetailPage = async ({ params }: { params: { productId: string } }) => {
  const productId = parseInt(params.productId);
  const product = await fetchProductDetailWithPrisma(productId);

  if (!product) {
    return notFound();
  }

  const images = product.product_images.map((image) => image.image_url);

  return (
    <section className="mx-auto w-full md:max-w-[375px] pb-20">
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
          currentPrice={product.current_price}
          decreaseUnit={product.decrease_unit}
          startPrice={product.start_price}
          minPrice={product.min_price}
          createdAt={product.created_at}
        />
        <ProductDescription description={product.description} />
      </div>
      <ProductFooter
        currentPrice={product.current_price}
        minPrice={product.min_price}
        createdAt={product.created_at}
      />
    </section>
  );
};

export default ProductDetailPage;
