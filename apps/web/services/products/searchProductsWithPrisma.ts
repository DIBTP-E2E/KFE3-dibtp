import { prisma } from '@/lib/prisma';

import { ProductsAPIResponse } from '@/types';
import { getAuthenticatedUser } from '@/utils/auth';

import { convertToProductCardResponse } from './mappers';

interface SearchFilters {
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  region?: string;
}

const searchProductsWithPrisma = async (
  filters: SearchFilters = {}
): Promise<ProductsAPIResponse> => {
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

    const { keyword, minPrice, maxPrice, status, region } = filters;

    // 검색 조건 구성
    const whereConditions: {
      region: string;
      OR?: Array<{
        title?: { contains: string; mode: 'insensitive' };
        description?: { contains: string; mode: 'insensitive' };
      }>;
      current_price?: { gte?: number; lte?: number };
      status?: string;
    } = {
      region: region || user.region, // 필터로 지정된 region 또는 사용자의 region
    };

    // 키워드 검색 (제목과 설명에서 검색)
    if (keyword) {
      whereConditions.OR = [
        {
          title: {
            contains: keyword,
            mode: 'insensitive', // 대소문자 무시
          },
        },
        {
          description: {
            contains: keyword,
            mode: 'insensitive',
          },
        },
      ];
    }

    // 가격 범위 필터
    if (minPrice !== undefined || maxPrice !== undefined) {
      whereConditions.current_price = {};
      if (minPrice !== undefined) {
        whereConditions.current_price.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        whereConditions.current_price.lte = maxPrice;
      }
    }

    // 상태 필터
    if (status) {
      whereConditions.status = status;
    }

    const products = await prisma.products.findMany({
      where: whereConditions,
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
      console.error('Error fetching products with keyword:', error);
    }
    throw new Error('Failed to fetch products with keyword');
  }
};

export { searchProductsWithPrisma };
