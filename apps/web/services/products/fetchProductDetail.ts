import { prisma } from '@/lib/prisma';

import { ProductDetailAPIResponse } from '@/types';

import { convertToProductDetailResponse } from './mappers';

const fetchProductDetailWithPrisma = async (
  productId: number
): Promise<ProductDetailAPIResponse | null> => {
  try {
    const product = await prisma.products.findUnique({
      where: {
        product_id: BigInt(productId),
      },
      select: {
        product_id: true,
        title: true,
        description: true,
        start_price: true,
        current_price: true,
        min_price: true,
        decrease_unit: true,
        status: true,
        region: true,
        detail_address: true,
        view_count: true,
        created_at: true,
        updated_at: true,
        seller_user_id: true,
        product_images: {
          select: {
            image_id: true,
            product_id: true,
            image_url: true,
            image_order: true,
            created_at: true,
          },
          orderBy: {
            image_order: 'asc',
          },
        },
      },
    });

    if (!product) {
      return null;
    }

    return convertToProductDetailResponse(product);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error fetching product detail with Prisma:', error);
    }
    throw new Error('Failed to fetch product detail with Prisma');
  }
};

export { fetchProductDetailWithPrisma };
