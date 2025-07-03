import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validations';

import { getAuthenticatedUser } from '@/utils';

export async function POST(request: NextRequest) {
  try {
    // 사용자 인증 확인
    const authResult = await getAuthenticatedUser();
    if (!authResult.success || !authResult.userId) {
      return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
    }

    const body = await request.json();
    const { images, ...productData } = body;

    // Zod 스키마로 유효성 검사
    const validatedData = productSchema.parse(productData);

    // 트랜잭션을 사용하여 상품과 이미지를 원자적으로 처리
    const result = await prisma.$transaction(async (tx) => {
      // 상품 생성
      const product = await tx.products.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          start_price: parseFloat(validatedData.start_price),
          current_price: parseFloat(validatedData.start_price), // 시작 가격으로 초기화
          min_price: parseFloat(validatedData.min_price),
          decrease_unit: parseFloat(validatedData.decrease_unit),
          region: validatedData.region,
          detail_address: validatedData.detail_address,
          seller_user_id: authResult.userId!,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      // 이미지가 있으면 product_images 테이블에 저장
      if (images && images.length > 0) {
        const imageRecords = images.map((image: { url: string }, index: number) => ({
          product_id: product.product_id,
          image_url: image.url,
          image_order: index,
          created_at: new Date(),
        }));

        await tx.product_images.createMany({
          data: imageRecords,
        });
      }

      return product;
    });

    const product = result;

    return NextResponse.json(
      {
        message: '상품이 성공적으로 등록되었습니다',
        product_id: product.product_id.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('상품 등록 오류:', error);

    // Zod 유효성 검사 오류
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: '입력 데이터가 올바르지 않습니다', details: error },
        { status: 400 }
      );
    }

    // Prisma 오류
    if (error instanceof Error && error.message.includes('Prisma')) {
      return NextResponse.json({ error: '데이터베이스 오류가 발생했습니다' }, { status: 500 });
    }

    return NextResponse.json({ error: '상품 등록 중 오류가 발생했습니다' }, { status: 500 });
  }
}
