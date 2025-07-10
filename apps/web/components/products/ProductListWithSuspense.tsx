import { Suspense } from 'react';

import type { ProductsAPIResponse } from '@/types';

import ProductList from './ProductList';
import ProductListSkeleton from './ProductListSkeleton';

interface ProductListWithSuspenseProps {
  products: ProductsAPIResponse;
}

const ProductListWithSuspense = ({ products }: ProductListWithSuspenseProps) => {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductList products={products} />
    </Suspense>
  );
};

export default ProductListWithSuspense;
