import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

import { getAuthenticatedUser } from '@/utils/auth/server';

interface RouteParams {
  params: {
    productId: string;
  };
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { productId } = params;

    // 사용자 인증 확인
    const authResult = await getAuthenticatedUser();
    if (!authResult.success || !authResult.userId) {
      return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
    }

    if (!productId) {
      return NextResponse.json({ error: '상품 ID가 필요합니다' }, { status: 400 });
    }

    // 상품 존재 여부 및 소유권 확인
    const product = await prisma.products.findUnique({
      where: { product_id: BigInt(productId) },
      include: {
        bids: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: '상품을 찾을 수 없습니다' }, { status: 404 });
    }

    if (product.seller_user_id !== authResult.userId) {
      return NextResponse.json({ error: '상품을 삭제할 권한이 없습니다' }, { status: 403 });
    }

    // 입찰 내역이 있는 상품은 삭제 불가
    if (product.bids) {
      return NextResponse.json(
        {
          error: '입찰 내역이 있는 상품은 삭제할 수 없습니다',
        },
        { status: 400 }
      );
    }

    // 트랜잭션으로 관련 데이터들 삭제
    await prisma.$transaction(async (tx) => {
      // 1. 상품 이미지들 삭제
      await tx.product_images.deleteMany({
        where: { product_id: BigInt(productId) },
      });

      // 2. 상품 삭제 (입찰 내역은 이미 없음을 확인했으므로 생략)
      await tx.products.delete({
        where: { product_id: BigInt(productId) },
      });
    });

    return NextResponse.json({
      message: '상품이 성공적으로 삭제되었습니다',
    });
  } catch (error) {
    console.error('상품 삭제 오류:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: '상품 삭제 중 오류가 발생했습니다' }, { status: 500 });
  }
}
