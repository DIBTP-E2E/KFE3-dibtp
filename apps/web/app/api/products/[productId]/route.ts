import { NextRequest, NextResponse } from 'next/server';

import { PRODUCT_STATUS } from '@web/constants';
import { prisma } from '@web/lib/prisma';
import { productSchema } from '@web/lib/validations';

import { deleteFromStorage } from '@web/services/images/server';
import { getAuthenticatedUser } from '@web/utils/auth/server';
import { extractStoragePaths } from '@web/utils/image';

interface RouteParams {
  params: Promise<{
    productId: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { productId } = await params;

    // 사용자 인증 확인
    const authResult = await getAuthenticatedUser();
    if (!authResult.success || !authResult.userId) {
      return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
    }

    if (!productId) {
      return NextResponse.json({ error: '상품 ID가 필요합니다' }, { status: 400 });
    }

    const body = await request.json();
    const { images, existingImages = [], orderedImages = [], ...productData } = body;

    // Zod 스키마로 유효성 검사
    const validatedData = productSchema.parse(productData);

    // 상품 존재 여부 및 소유권 확인
    const existingProduct = await prisma.products.findUnique({
      where: { product_id: BigInt(productId) },
      include: {
        bids: true,
      },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: '상품을 찾을 수 없습니다' }, { status: 404 });
    }

    if (existingProduct.seller_user_id !== authResult.userId) {
      return NextResponse.json({ error: '상품을 수정할 권한이 없습니다' }, { status: 403 });
    }

    // 경매 중지(CANCEL) 상태의 상품만 수정 가능
    if (existingProduct.status !== PRODUCT_STATUS.CANCEL) {
      return NextResponse.json(
        { error: '경매 중지 상태인 상품만 수정할 수 있습니다' },
        { status: 400 }
      );
    }

    // 기존 이미지 정보 조회 (삭제할 이미지 식별용)
    const currentImages = await prisma.product_images.findMany({
      where: { product_id: BigInt(productId) },
      select: { image_url: true },
    });

    const currentImageUrls = currentImages.map((img) => img.image_url);
    const imagesToDelete = currentImageUrls.filter((url) => !existingImages.includes(url));

    // 1단계: 삭제할 이미지가 있다면 스토리지에서 먼저 삭제
    if (imagesToDelete.length > 0) {
      const pathsToDelete = extractStoragePaths(imagesToDelete);
      if (pathsToDelete.length > 0) {
        const deleteResult = await deleteFromStorage(pathsToDelete, authResult.userId, 'product');

        if (!deleteResult.success || deleteResult.errors.length > 0) {
          console.warn('일부 이미지 삭제 실패:', deleteResult.errors);
          // 스토리지 삭제 실패해도 DB 업데이트는 진행 (일관성 보다 가용성 우선)
        }
      }
    }

    // 2단계: 트랜잭션으로 상품 정보 및 이미지 업데이트
    const result = await prisma.$transaction(async (tx) => {
      // 상품 정보 업데이트
      const updatedProduct = await tx.products.update({
        where: { product_id: BigInt(productId) },
        data: {
          title: validatedData.title,
          description: validatedData.description,
          start_price: parseFloat(validatedData.start_price),
          min_price: parseFloat(validatedData.min_price),
          decrease_unit: parseFloat(validatedData.decrease_unit),
          region: validatedData.region,
          detail_address: validatedData.detail_address,
          updated_at: new Date(),
        },
      });

      // 기존 이미지 정보 모두 삭제
      await tx.product_images.deleteMany({
        where: { product_id: BigInt(productId) },
      });

      // 순서 정보가 있다면 이를 우선 사용, 없다면 기존 방식 사용
      let allImages: string[] = [];

      if (orderedImages && orderedImages.length > 0) {
        // 순서 정보가 있는 경우: 새로운 이미지는 업로드된 URL로 교체
        let newImageIndex = 0; // 새로운 이미지들의 인덱스 추적

        allImages = orderedImages.map((item: { url: string; type: string }) => {
          if (item.type === 'new') {
            // 새로운 이미지의 경우 업로드된 순서대로 URL 매칭
            const uploadedImages = (images || []) as { url: string }[];
            if (newImageIndex < uploadedImages.length) {
              const uploadedUrl = uploadedImages[newImageIndex]?.url;
              if (!uploadedUrl) {
                throw new Error(`업로드된 이미지 URL이 없습니다: index ${newImageIndex}`);
              }
              newImageIndex++; // 다음 새로운 이미지를 위해 인덱스 증가
              return uploadedUrl;
            }
            // 매칭되는 업로드된 이미지가 없으면 오류
            throw new Error(`새로운 이미지를 찾을 수 없습니다: ${item.url}`);
          }
          return item.url; // 기존 이미지는 그대로 사용
        });
      } else {
        // 기존 방식: 기존 이미지 + 새 이미지
        allImages = [...existingImages, ...(images || []).map((img: { url: string }) => img.url)];
      }

      if (allImages.length > 0) {
        const imageRecords = allImages.map((imageUrl: string, index: number) => ({
          product_id: BigInt(productId),
          image_url: imageUrl,
          image_order: index,
          created_at: new Date(),
        }));

        await tx.product_images.createMany({
          data: imageRecords,
        });
      }

      return updatedProduct;
    });

    return NextResponse.json({
      message: '상품이 성공적으로 수정되었습니다',
      product_id: result.product_id.toString(),
    });
  } catch (error) {
    console.error('상품 수정 오류:', error);

    // Zod 유효성 검사 오류
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: '입력 데이터가 올바르지 않습니다', details: error },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: '상품 수정 중 오류가 발생했습니다' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { productId } = await params;

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
