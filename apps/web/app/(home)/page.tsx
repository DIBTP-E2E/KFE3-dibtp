import { fetchProductsWithPrisma } from '@/services/products';

import { ProductListWithSuspense } from '@/components/products';

export const dynamic = 'force-dynamic';

const HomePage = async () => {
  const products = await fetchProductsWithPrisma();

  return (
    <>
      <h2 className="sr-only">경매 상품 리스트</h2>
      <ProductListWithSuspense products={products} />
    </>
  );
};

export default HomePage;
