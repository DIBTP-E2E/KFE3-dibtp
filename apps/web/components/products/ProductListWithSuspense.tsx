import { Suspense } from 'react';

import ProductList from './ProductList';
import ProductListSkeleton from './ProductListSkeleton';

const ProductListWithSuspense = () => {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductList />
    </Suspense>
  );
};

export default ProductListWithSuspense;
