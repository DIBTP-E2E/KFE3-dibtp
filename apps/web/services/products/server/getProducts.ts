import { prisma } from '@web/lib/prisma';

import type { ProductsAPIResponse } from '@web/types';

import { getLocationCookie } from '@web/utils/auth/server';
import { convertToProductCardResponse } from '@web/utils/products';

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
  detail_address?: {
    contains: string;
  };
  OR?: Array<{
    title?: { contains: string; mode: 'insensitive' };
    description?: { contains: string; mode: 'insensitive' };
  }>;
  // current_price?: { gte?: number; lte?: number }; // current_price 제거
  status?: string;
  category?: string;
}

interface OrderByConditions {
  created_at?: 'asc' | 'desc';
  // current_price?: 'asc' | 'desc'; // current_price 제거
  view_count?: 'asc' | 'desc';
}

export const getProductsWithPrisma = async (
  filters: ProductQueryFilters = {}
): Promise<ProductsAPIResponse> => {
  try {
    // 쿠키에 저장된 사용자 정보 조회
    const userInfo = await getLocationCookie();
    if (!userInfo) {
      throw new Error('User not authenticated');
    }

    // DB 조회 없이 쿠키에서 바로 위치 정보 사용
    const { region: userRegion, detailAddress } = userInfo;

    const {
      keyword,
      // minPrice, // TODO: 향후 사용 예정
      // maxPrice, // TODO: 향후 사용 예정
      status,
      region,
      category,
      sortBy = 'created_at',
      sortOrder = 'desc',
    } = filters;

    // 기본 where 조건 - detail_address 우선, 없으면 region으로 폴백
    const whereConditions: WhereConditions = {
      region: userRegion || region || '미확인 지역',
    };

    // 사용자가 detail_address를 설정했다면 더 세밀한 매칭 적용
    // 같은 region 내에서 사용자의 구/군이 상품의 전체 주소에 포함되는 경우에만 노출
    if (detailAddress && detailAddress !== '상세 주소 없음') {
      whereConditions.detail_address = {
        contains: detailAddress, // 예: 사용자 "중구" → 상품 "서울 중구 남창동 9-1" 매칭
      };
    }

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

    // 가격 범위 필터 (current_price 제거로 인해 주석 처리)
    // if (minPrice !== undefined || maxPrice !== undefined) {
    //   whereConditions.current_price = {};
    //   if (minPrice !== undefined) {
    //     whereConditions.current_price.gte = minPrice;
    //   }
    //   if (maxPrice !== undefined) {
    //     whereConditions.current_price.lte = maxPrice;
    //   }
    // }

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
      // orderBy.current_price = sortOrder; // current_price 제거
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
