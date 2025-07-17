import { MetadataRoute } from 'next';

import { prisma } from '@/lib/prisma';

import { PAGE_ROUTES } from '@/constants';

export const revalidate = 1800; // 30분마다 업데이트

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_DEPLOY_URL!;

  // 정적 페이지들
  const staticPages = [
    {
      url: `${baseUrl}${PAGE_ROUTES.HOME}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}${PAGE_ROUTES.AUTH.LOGIN}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}${PAGE_ROUTES.AUTH.SIGNUP}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // 동적 상품 페이지들 - 공개 상품만 조회
  let productPages: MetadataRoute.Sitemap = [];

  try {
    const products = await prisma.products.findMany({
      where: {
        status: 'ACTIVE', // 활성 상품만
      },
      select: {
        product_id: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 1000, // 사이트맵 크기 제한
    });

    productPages = products.map((product) => ({
      url: `${baseUrl}${PAGE_ROUTES.PRODUCTS.DETAIL(product.product_id.toString())}`,
      lastModified: new Date(product.created_at),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error fetching products for sitemap:', error);
    }
  }

  return [...staticPages, ...productPages];
}
