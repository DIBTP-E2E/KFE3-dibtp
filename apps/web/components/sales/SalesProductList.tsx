import { useMyProducts } from '@web/hooks';
import type { ProductStatus } from '@web/types';
import { filterProductsByStatus } from '@web/utils/products';

import ProductListSkeleton from '../products/ProductListSkeleton';

import SalesEmptyState from './SalesEmptyState';
import SalesProductCard from './SalesProductCard';

interface SalesProductListProps {
  targetStatus: ProductStatus;
}

const SalesProductList = ({ targetStatus }: SalesProductListProps) => {
  const { data: userProducts = [], isLoading, error } = useMyProducts();

  if (isLoading) return <ProductListSkeleton />;

  if (error) {
    return (
      <div className="flex items-center justify-center py-lg text-text-secondary">
        데이터를 불러오는데 실패했습니다.
      </div>
    );
  }

  const filteredProducts = filterProductsByStatus(userProducts, targetStatus);

  if (filteredProducts.length === 0) {
    return <SalesEmptyState status={targetStatus} />;
  }

  return (
    <ul>
      {filteredProducts.map((product) => (
        <li key={product.product_id}>
          <SalesProductCard
            productId={product.product_id}
            imgUrl={product.image_url}
            title={product.title}
            startPrice={product.start_price}
            minPrice={product.min_price}
            decreaseUnit={product.decrease_unit}
            auctionStartedAt={product.created_at}
            status={product.status}
            region={product.region}
            detailAddress={product.detail_address}
            createdAt={product.created_at}
          />
        </li>
      ))}
    </ul>
  );
};

export default SalesProductList;
