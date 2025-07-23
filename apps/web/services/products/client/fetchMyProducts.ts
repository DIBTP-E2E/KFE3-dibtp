import { API_ROUTES } from '@web/constants';
import type { ProductStatus } from '@web/types';

export const fetchMyProducts = async (status?: ProductStatus) => {
  const url = new URL(API_ROUTES.MY_PRODUCTS, window.location.origin);
  if (status) {
    url.searchParams.append('status', status);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Failed to fetch user products');
  }

  return response.json();
};
