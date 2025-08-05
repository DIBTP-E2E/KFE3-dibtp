import { Suspense } from 'react';

import { ProductQueryFilters } from '@web/services/products/server';

import ProductList from './ProductList';
import ProductListSkeleton from './ProductListSkeleton';

const ProductListWithSuspense = ({ keyword }: ProductQueryFilters) => {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductList keyword={keyword} />
    </Suspense>
  );
};

export default ProductListWithSuspense;
