import { prisma } from '@web/lib/prisma';

import type { ProductsAPIResponse, ProductStatus } from '@web/types';
import { getAuthenticatedUser } from '@web/utils/auth/server';
import { convertToProductCardResponse } from '@web/utils/products';

export interface UserProductsQueryFilters {
  status?: ProductStatus;
}

export const getMyProducts = async (
  filters: UserProductsQueryFilters = {}
): Promise<ProductsAPIResponse> => {
  try {
    // 로그인한 사용자 정보 가져오기
    const authResult = await getAuthenticatedUser();
    if (!authResult.success || !authResult.userId) {
      throw new Error('User not authenticated');
    }

    const { status } = filters;

    const whereConditions = {
      seller_user_id: authResult.userId,
      ...(status && { status }),
    };

    const products = await prisma.products.findMany({
      where: whereConditions,
      select: {
        product_id: true,
        title: true,
        start_price: true,
        min_price: true,
        decrease_unit: true,
        status: true,
        view_count: true,
        created_at: true,
        region: true,
        detail_address: true,
        product_images: {
          select: {
            image_url: true,
            image_order: true,
          },
          orderBy: {
            image_order: 'asc' as const,
          },
        },
        bids: {
          select: {
            bidder_user_id: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return products.map(convertToProductCardResponse);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error fetching user products:', error);
    }
    throw new Error('Failed to fetch user products');
  }
};
