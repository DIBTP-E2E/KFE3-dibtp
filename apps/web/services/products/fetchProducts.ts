import { prisma } from '@/lib/prisma';

import { ProductsAPIResponse } from '@/types';

import { convertToProductCardResponse } from './mappers';

const fetchProductsWithPrisma = async (): Promise<ProductsAPIResponse> => {
  try {
    const products = await prisma.products.findMany({
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
