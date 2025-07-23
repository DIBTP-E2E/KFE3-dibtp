'use client';

import { useQuery } from '@tanstack/react-query';

import { MY_PRODUCTS_QUERY_KEY } from '@web/constants';
import { fetchMyProducts } from '@web/services/products/client';

import type { ProductsAPIResponse, ProductStatus } from '@web/types';

interface UseMyProductsProps {
  status?: ProductStatus;
}

export const useMyProducts = ({ status }: UseMyProductsProps = {}) => {
  return useQuery<ProductsAPIResponse>({
    queryKey: MY_PRODUCTS_QUERY_KEY.byStatus(status),
    queryFn: () => fetchMyProducts(status),
  });
};
