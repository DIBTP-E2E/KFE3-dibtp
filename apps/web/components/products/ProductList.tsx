import { fetchProductsWithPrisma, type ProductQueryFilters } from '@/services/products/server';

import ProductCard from './ProductCard';

const ProductList = async ({ keyword }: ProductQueryFilters) => {
  const products = await fetchProductsWithPrisma({ keyword });

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center p-3xl">
        <p className="text-text-info">등록된 상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1">
      {products.map((product) => (
        <li key={product.product_id}>
          <ProductCard
            productId={product.product_id}
            imgUrl={product.image_url}
            title={product.title}
            startPrice={product.start_price}
            minPrice={product.min_price}
            decreaseUnit={product.decrease_unit}
            auctionStartedAt={product.created_at}
            status={product.status}
            viewCount={product.view_count}
            region={product.region}
            detailAddress={product.detail_address}
            createdAt={product.created_at}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
