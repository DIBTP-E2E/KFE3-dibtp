import { NextRequest, NextResponse } from 'next/server';

import { createFavorite, deleteFavorite, getFavoriteStatus } from '@web/services/favorites/server';

import { getUserIdCookie } from '@web/utils/auth/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: '상품 ID가 필요합니다.' }, { status: 400 });
  }

  try {
    const userId = await getUserIdCookie();
    if (!userId) {
      return NextResponse.json({ isFavorite: false });
    }

    const isFavorite = await getFavoriteStatus(userId, parseInt(productId, 10));

    return NextResponse.json({ isFavorite }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('찜 상태 확인 오류:', error);
    }

    return NextResponse.json({ error: '찜 상태를 확인하는 데 실패했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdCookie();
    if (!userId) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const { productId }: { productId: number } = await request.json();
    if (!productId) {
      return NextResponse.json({ error: '상품 ID가 필요합니다.' }, { status: 400 });
    }

    await createFavorite(userId, productId);

    return NextResponse.json({ message: '찜하기에 성공했습니다.' }, { status: 201 });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('찜하기 생성 오류:', error);
    }

    return NextResponse.json({ error: '찜하기에 실패했습니다.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getUserIdCookie();
    if (!userId) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const { productId }: { productId: number } = await request.json();
    if (!productId) {
      return NextResponse.json({ error: '상품 ID가 필요합니다.' }, { status: 400 });
    }

    await deleteFavorite(userId, productId);

    return NextResponse.json({ message: '찜하기 취소에 성공했습니다.' }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('찜하기 취소 오류:', error);
    }

    return NextResponse.json({ error: '찜하기 취소에 실패했습니다.' }, { status: 500 });
  }
}
