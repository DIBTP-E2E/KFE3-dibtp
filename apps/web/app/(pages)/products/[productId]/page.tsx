import {
  ProductDetailHeader,
  ProductImageCarousel,
  ProductTitle,
  AuctionInfoLayout,
  ProductDescription,
  ProductFooter,
  UserInfoLayout,
} from '@/components/product-detail';
import { mockProduct, mockProductImages } from './data';

const ProductDetailPage = () => {
  const images = mockProductImages.map((image) => image.image_url);

  return (
    <div className="mx-auto w-full max-w-[375px] pb-20">
      {' '}
      {/* 푸터 높이만큼 하단 패딩 추가 */}
      <ProductDetailHeader />
      <ProductImageCarousel images={images} />
      {/* 여기에 상품 상세 정보 컴포넌트들이 추가될 예정 */}
      <div className="p-4">
        <ProductTitle title={mockProduct.title} />
        <UserInfoLayout
          sellerNickname="판매자 닉네임 (목데이터)" // 실제 데이터 사용 시 mockProduct.seller_nickname 등으로 변경
          sellerAvatarUrl="https://picsum.photos/seed/seller/200/200" // 실제 데이터 사용 시 변경
        />
        <AuctionInfoLayout
          currentPrice={mockProduct.current_price}
          decreaseUnit={mockProduct.decrease_unit}
          startPrice={mockProduct.start_price}
          minPrice={mockProduct.min_price}
          createdAt={mockProduct.created_at}
        />
        <ProductDescription description={mockProduct.description} />
      </div>
      <ProductFooter currentPrice={mockProduct.current_price} minPrice={mockProduct.min_price} createdAt={mockProduct.created_at} />
    </div>
  );
};

export default ProductDetailPage;
