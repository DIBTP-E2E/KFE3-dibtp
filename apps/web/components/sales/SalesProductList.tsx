import { DECREASE_INTERVAL_SECONDS } from '@/constants/products/product-status';

import type { ProductStatus } from '@/types';
import { filterProductsByStatus } from '@/utils/products';

import ProductCard from '../products/ProductCard';

import { MOCK_SALES_PRODUCTS } from './mockData';
import SalesEmptyState from './SalesEmptyState';

interface SalesProductListProps {
  targetStatus: ProductStatus;
}

const SalesProductList = ({ targetStatus }: SalesProductListProps) => {
  // TODO: 실제 데이터는 서버에서 패치해야 함
  const filteredProducts = filterProductsByStatus(MOCK_SALES_PRODUCTS, targetStatus);

  if (filteredProducts.length === 0) {
    return <SalesEmptyState status={targetStatus} />;
  }

  return (
    <div className="space-y-md">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.product_id}
          productId={product.product_id}
          title={product.title}
          imgUrl={product.product_images[0]?.image_url || ''}
          startPrice={product.start_price}
          minPrice={product.min_price}
          decreaseUnit={product.decrease_unit}
          auctionStartedAt={product.created_at}
          decreaseInterval={DECREASE_INTERVAL_SECONDS}
          status={product.status}
          viewCount={product.view_count}
          createdAt={product.created_at}
          region={product.region}
          bidderUserId={product.seller_user_id}
        />
      ))}
    </div>
  );
};

export default SalesProductList;
