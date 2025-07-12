
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/utils';

export async function POST(request: NextRequest) {
  try {
    const authResult = await getAuthenticatedUser();
    if (!authResult.success || !authResult.userId) {
      return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
    }

    const body = await request.json();
    const { productId, bidPrice } = body;

    if (!productId || !bidPrice) {
      return NextResponse.json({ error: '상품 ID와 입찰 가격을 모두 입력해주세요' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. 입찰 생성
      const newBid = await tx.bids.create({
        data: {
          product_id: productId,
          bidder_user_id: authResult.userId!,
          bid_price: bidPrice,
          created_at: new Date(),
        },
      });

      // 2. 상품 상태를 'SOLD'로 업데이트
      const updatedProduct = await tx.products.update({
        where: {
          product_id: productId,
        },
        data: {
          status: 'SOLD',
          updated_at: new Date(),
        },
      });

      return { newBid, updatedProduct };
    });

    return NextResponse.json(
      {
        message: '입찰이 성공적으로 완료되었습니다',
        bid: result.newBid,
        product: result.updatedProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('입찰 처리 오류:', error);

    if (error instanceof Error && error.message.includes('Prisma')) {
      return NextResponse.json({ error: '데이터베이스 오류가 발생했습니다' }, { status: 500 });
    }

    return NextResponse.json({ error: '입찰 처리 중 오류가 발생했습니다' }, { status: 500 });
  }
}
