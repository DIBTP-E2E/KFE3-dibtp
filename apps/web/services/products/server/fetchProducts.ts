import { prisma } from '@/lib/prisma';

import { ProductsAPIResponse } from '@/types';
import { convertToProductCardResponse } from '@/utils';
import { getAuthenticatedUser } from '@/utils/auth/server';

export interface ProductQueryFilters {
  keyword?: string;

  // ** TODO: 쿼리 사용 예정 **
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  region?: string;
  category?: string;
  sortBy?: 'created_at' | 'price' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

interface WhereConditions {
  region: string;
  OR?: Array<{
    title?: { contains: string; mode: 'insensitive' };
    description?: { contains: string; mode: 'insensitive' };
  }>;
  current_price?: { gte?: number; lte?: number };
  status?: string;
  category?: string;
}

interface OrderByConditions {
  created_at?: 'asc' | 'desc';
  current_price?: 'asc' | 'desc';
  view_count?: 'asc' | 'desc';
}

export const fetchProductsWithPrisma = async (
  filters: ProductQueryFilters = {}
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

    const {
      keyword,
      minPrice,
      maxPrice,
      status,
      region,
      category,
      sortBy = 'created_at',
      sortOrder = 'desc',
    } = filters;

    // 기본 where 조건 (사용자의 region 또는 필터로 지정된 region)
    const whereConditions: WhereConditions = {
      region: region || user.region,
    };

    // 키워드 검색 (제목과 설명에서 검색)
    if (keyword) {
      whereConditions.OR = [
        {
          title: {
            contains: keyword,
            mode: 'insensitive',
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

    // 카테고리 필터 (미래 확장)
    if (category) {
      whereConditions.category = category;
    }

    // 정렬 조건
    const orderBy: OrderByConditions = {};
    if (sortBy === 'price') {
      orderBy.current_price = sortOrder;
    } else if (sortBy === 'popularity') {
      orderBy.view_count = sortOrder;
    } else {
      orderBy.created_at = sortOrder;
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
      orderBy,
    });

    return products.map(convertToProductCardResponse);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error fetching products with filters:', error);
    }
    throw new Error('Failed to fetch products with filters');
  }
};
