import { NextRequest, NextResponse } from 'next/server';

import { uploadToStorage, deleteFromStorage } from '@/services/images/server';

import { getAuthenticatedUser } from '@/utils/auth';

export async function POST(request: NextRequest) {
  try {
    // 사용자 인증 확인
    const authResult = await getAuthenticatedUser();
    if (!authResult.success || !authResult.userId) {
      return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
    }

    // FormData에서 파일 추출
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: '업로드할 이미지를 선택해주세요' }, { status: 400 });
    }

    // 서버 서비스를 통해 이미지 업로드
    const result = await uploadToStorage(files, authResult.userId);

    // 결과 반환
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
    console.error('이미지 업로드 오류:', error);
    return NextResponse.json({ error: '이미지 업로드 중 오류가 발생했습니다' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // 사용자 인증 확인
    const authResult = await getAuthenticatedUser();
    if (!authResult.success || !authResult.userId) {
      return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
    }

    const { paths } = await request.json();

    if (!Array.isArray(paths) || paths.length === 0) {
      return NextResponse.json({ error: '삭제할 이미지 경로를 제공해주세요' }, { status: 400 });
    }

    // 서버 서비스를 통해 이미지 삭제
    const result = await deleteFromStorage(paths, authResult.userId);

    return NextResponse.json({
      success: true,
      message: `${result.deleteResults.length}개의 이미지가 삭제되었습니다`,
      deletedPaths: result.deleteResults,
      errors: result.errors.length > 0 ? result.errors : undefined,
    });
  } catch (error) {
    console.error('이미지 삭제 오류:', error);
    return NextResponse.json({ error: '이미지 삭제 중 오류가 발생했습니다' }, { status: 500 });
  }
}
