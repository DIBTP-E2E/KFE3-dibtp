import { prisma } from '@/lib/prisma';

import type { ProductsAPIResponse, ProductStatusSchema } from '@/types';

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

    // ProductsAPIResponse 형식으로 변환
    return products.map((product) => ({
      product_id: parseInt(product.product_id.toString()),
      title: product.title,
      image_url:
        product.product_images?.length > 0 ? (product.product_images[0]?.image_url ?? '') : '',
      current_price: product.current_price.toNumber(),
      status: product.status as ProductStatusSchema,
      view_count: product.view_count,
      created_at: product.created_at.toISOString(),
      region: product.region,
      bidder_user_id: product.bids?.bidder_user_id || '',
    }));
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error fetching products with Prisma:', error);
    }
    throw new Error('Failed to fetch products with Prisma');
  }
};

export { fetchProductsWithPrisma };
