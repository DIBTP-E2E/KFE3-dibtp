import type { Product, ProductStatus } from '@/types';

export const filterProductsByStatus = (products: Product[], status: ProductStatus): Product[] => {
  return products.filter((product) => product.status === status);
};
