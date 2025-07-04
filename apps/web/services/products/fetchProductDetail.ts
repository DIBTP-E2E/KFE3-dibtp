import { prisma } from '@/lib/prisma';

import type { ProductAPIResponse } from '@/types';

const fetchProductDetailWithPrisma = async (
  productId: number
): Promise<ProductAPIResponse | null> => {
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

    // ProductAPIResponse 형식으로 변환
    return {
      product_id: parseInt(product.product_id.toString()),
      title: product.title,
      image_url:
        product.product_images?.length > 0 ? (product.product_images[0]?.image_url ?? '') : '',
      description: product.description,
      start_price: product.start_price.toNumber(),
      current_price: product.current_price.toNumber(),
      min_price: product.min_price.toNumber(),
      decrease_unit: product.decrease_unit.toNumber(),
      status: product.status as ProductAPIResponse['status'],
      region: product.region,
      detail_address: product.detail_address,
      view_count: product.view_count,
      created_at: product.created_at.toISOString(),
      updated_at: product.updated_at?.toISOString() || product.created_at.toISOString(),
      seller_user_id: product.seller_user_id,
      product_images: product.product_images.map((img) => ({
        image_id: parseInt(img.image_id.toString()),
        product_id: parseInt(img.product_id.toString()),
        image_url: img.image_url,
        image_order: img.image_order,
        created_at: img.created_at.toISOString(),
      })),
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error fetching product detail with Prisma:', error);
    }
    throw new Error('Failed to fetch product detail with Prisma');
  }
};

export { fetchProductDetailWithPrisma };
