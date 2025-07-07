import { fetchProductsWithPrisma } from '@/services/products';

import ProductCard from './ProductCard';

const ProductList = async () => {
  const products = await fetchProductsWithPrisma();

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500">등록된 상품이 없습니다.</p>
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
            currentPrice={product.current_price}
            status={product.status}
            viewCount={product.view_count}
            region={product.region}
            createdAt={product.created_at}
            bidderUserId={product.bidder_user_id}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
