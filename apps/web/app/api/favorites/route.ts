import { NextRequest, NextResponse } from 'next/server';

import { createFavorite, deleteFavorite, getFavoriteStatus } from '@/services/favorites/server';

import { getAuthenticatedUser } from '@/utils/auth/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: '상품 ID가 필요합니다.' }, { status: 400 });
  }

  try {
    const { success, userId } = await getAuthenticatedUser();
    if (!success || !userId) {
      return NextResponse.json({ isFavorite: false });
    }

    const isFavorite = await getFavoriteStatus(userId, parseInt(productId, 10));
    return NextResponse.json({ isFavorite }, { status: 200 });
  } catch (error) {
    console.error('찜 상태 확인 오류:', error);
    return NextResponse.json({ error: '찜 상태를 확인하는 데 실패했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { success, userId } = await getAuthenticatedUser();
    if (!success || !userId) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
    }

    const { productId }: { productId: number } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: '상품 ID가 필요합니다.' }, { status: 400 });
    }

    await createFavorite(userId, productId);

    return NextResponse.json({ message: '찜하기에 성공했습니다.' }, { status: 201 });
  } catch (error) {
    console.error('찜하기 생성 오류:', error);
    return NextResponse.json({ error: '찜하기에 실패했습니다.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { success, userId } = await getAuthenticatedUser();
    if (!success || !userId) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
    }

    const { productId }: { productId: number } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: '상품 ID가 필요합니다.' }, { status: 400 });
    }

    await deleteFavorite(userId, productId);

    return NextResponse.json({ message: '찜하기 취소에 성공했습니다.' }, { status: 200 });
  } catch (error) {
    console.error('찜하기 취소 오류:', error);
    return NextResponse.json({ error: '찜하기 취소에 실패했습니다.' }, { status: 500 });
  }
}
