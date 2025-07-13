
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/utils';

export async function POST(request: NextRequest) {
  let productId: any;
  let bidPrice: any;
  let product: any;

  try {
    const authResult = await getAuthenticatedUser();
    if (!authResult.success || !authResult.userId) {
      return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
    }

    const body = await request.json();
    ({ productId, bidPrice } = body);

    if (!productId || !bidPrice) {
      return NextResponse.json({ error: '상품 ID 또는 현재 상품 가격 정보가 누락되었습니다' }, { status: 400 });
    }

    product = await prisma.products.findUnique({
      where: {
        product_id: productId,
      },
    });

    if (!product) {
      return NextResponse.json({ error: '상품을 찾을 수 없습니다' }, { status: 404 });
    }

    if (product.status !== 'ACTIVE') {
      return NextResponse.json({ error: '경매가 진행 중인 상품이 아닙니다' }, { status: 400 });
    }

    if (product.seller_user_id === authResult.userId) {
      return NextResponse.json({ error: '자신의 상품에는 입찰할 수 없습니다' }, { status: 400 });
    }

    if (product.current_price.toFixed(2) !== bidPrice.toFixed(2)) {
      return NextResponse.json({ error: '입찰 가격이 현재 가격과 일치하지 않습니다' }, { status: 400 });
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

    const jsonResponse = JSON.stringify(
      {
        message: '입찰이 성공적으로 완료되었습니다',
        bid: result.newBid,
        product: result.updatedProduct,
      },
      (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    );

    return new NextResponse(jsonResponse, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('입찰 처리 오류:', error);

    if (error instanceof Error && error.message.includes('Prisma')) {
      return NextResponse.json({ error: '데이터베이스 오류가 발생했습니다' }, { status: 500 });
    }

    return NextResponse.json({ error: '입찰 처리 중 오류가 발생했습니다' }, { status: 500 });
  }
}
