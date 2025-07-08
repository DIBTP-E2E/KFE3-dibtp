import { prisma } from '@/lib/prisma';

import { ProductsAPIResponse } from '@/types';
import { getAuthenticatedUser } from '@/utils/auth';

import { convertToProductCardResponse } from './mappers';

const fetchProductsWithPrisma = async (): Promise<ProductsAPIResponse> => {
  try {
    // 로그인한 사용자 정보 가져오기
    const authResult = await getAuthenticatedUser();
    if (!authResult.success || !authResult.userId) {
      throw new Error('User not authenticated');
    }

    // 사용자의 region 정보 가져오기
    const user = await prisma.users.findUnique({
      where: { user_id: authResult.userId },
      select: { region: true },
    });

    if (!user?.region) {
      throw new Error('User region not found');
    }

    const products = await prisma.products.findMany({
      where: {
        region: user.region, // 사용자의 region과 일치하는 상품만 필터링
      },
      select: {
        product_id: true,
        title: true,
        current_price: true,
        status: true,
        view_count: true,
        created_at: true,
        region: true,
        product_images: {
          select: {
            image_url: true,
            image_order: true,
          },
          orderBy: {
            image_order: 'asc',
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
      console.error('Error fetching products with Prisma:', error);
    }
    throw new Error('Failed to fetch products with Prisma');
  }
};

export { fetchProductsWithPrisma };
