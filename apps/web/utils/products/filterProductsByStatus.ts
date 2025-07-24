import type { ProductStatus } from '@web/types';

export const filterProductsByStatus = <T extends { status: ProductStatus }>(
  products: T[],
  status: ProductStatus
): T[] => {
  return products.filter((product) => product.status === status);
};
