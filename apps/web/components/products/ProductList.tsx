import { fetchProductsWithPrisma } from '@/services/products';

import { default as ProductCard } from './ProductCard';

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
            imgUrl={product.image_url}
            name={product.title}
            price={product.current_price}
            region={product.region}
            createdAt={product.created_at}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
