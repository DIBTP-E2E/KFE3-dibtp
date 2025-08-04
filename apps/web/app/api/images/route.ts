import { NextRequest, NextResponse } from 'next/server';

import { uploadToStorage, deleteFromStorage } from '@web/services/images/server';
import type { ImageConfigType } from '@web/types';

import { getUserIdCookie } from '@web/utils/auth/server';

export async function POST(request: NextRequest) {
  try {
    // 사용자 인증 확인
    const userId = await getUserIdCookie();
    if (!userId) {
      return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
    }

    // FormData에서 파일과 설정 타입 추출
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    const configType = (formData.get('type') as ImageConfigType) || 'product';

    if (files.length === 0) {
      return NextResponse.json({ error: '업로드할 이미지를 선택해주세요' }, { status: 400 });
    }

    // 타입별 통합 서비스를 통해 이미지 업로드
    const result = await uploadToStorage(files, userId, configType);

    if (!result.success && result.errors.length > 0) {
      return NextResponse.json(
        { error: '이미지 업로드에 실패했습니다', details: result.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${result.uploadResults.length}개의 이미지가 업로드되었습니다`,
      images: result.uploadResults,
      errors: result.errors.length > 0 ? result.errors : undefined,
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('이미지 업로드 오류:', error);
    }

    return NextResponse.json({ error: '이미지 업로드 중 오류가 발생했습니다' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // 사용자 인증 확인
    const userId = await getUserIdCookie();
    if (!userId) {
      return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
    }

    const { paths, type } = await request.json();
    const configType = (type as ImageConfigType) || 'product';

    if (!Array.isArray(paths) || paths.length === 0) {
      return NextResponse.json({ error: '삭제할 이미지 경로를 제공해주세요' }, { status: 400 });
    }

    // 타입별 통합 서비스를 통해 이미지 삭제
    const result = await deleteFromStorage(paths, userId, configType);

    return NextResponse.json({
      success: true,
      message: `${result.deleteResults.length}개의 이미지가 삭제되었습니다`,
      deletedPaths: result.deleteResults,
      errors: result.errors.length > 0 ? result.errors : undefined,
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('이미지 삭제 오류:', error);
    }

    return NextResponse.json({ error: '이미지 삭제 중 오류가 발생했습니다' }, { status: 500 });
  }
}
