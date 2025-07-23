import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@web/lib/prisma';

import { updateProductStatus } from '@web/services/products/server';

import type { ProductStatus } from '@web/types';

import { getAuthenticatedUser } from '@web/utils/auth/server';

interface UpdateStatusRequest {
  productId: string;
  status: ProductStatus;
}

export async function PATCH(request: NextRequest) {
  try {
    // 사용자 인증 확인
    const authResult = await getAuthenticatedUser();
    if (!authResult.success || !authResult.userId) {
      return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
    }

    const body: UpdateStatusRequest = await request.json();
    const { productId, status } = body;

    if (!productId || !status) {
      return NextResponse.json({ error: '상품 ID와 상태가 필요합니다' }, { status: 400 });
    }

    // 소유권 확인을 위해 상품 정보 조회
    const product = await prisma.products.findUnique({
      where: { product_id: BigInt(productId) },
      select: { seller_user_id: true },
    });

    if (!product) {
      return NextResponse.json({ error: '상품을 찾을 수 없습니다' }, { status: 404 });
    }

    if (product.seller_user_id !== authResult.userId) {
      return NextResponse.json({ error: '상품 상태를 변경할 권한이 없습니다' }, { status: 403 });
    }

    // 상품 상태 업데이트
    const updatedProduct = await updateProductStatus(BigInt(productId), status);

    return NextResponse.json({
      message: '상품 상태가 성공적으로 업데이트되었습니다',
      product: {
        product_id: updatedProduct.product_id.toString(),
        status: updatedProduct.status,
        updated_at: updatedProduct.updated_at,
      },
    });
  } catch (error) {
    console.error('상품 상태 업데이트 오류:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: '상품 상태 업데이트 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
