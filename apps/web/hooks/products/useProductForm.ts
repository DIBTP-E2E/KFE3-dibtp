'use client';

import { useState, useEffect, useCallback } from 'react';

import { z } from 'zod';

import { useAppNavigation } from '@web/hooks';
import { productWithImagesSchema } from '@web/lib/validations';
import { saveProduct } from '@web/services/products/client';

import type {
  ProductFormData,
  ProductFormErrors,
  ProductFieldName,
  ProductDetailAPIResponse,
  Address,
} from '@web/types';

interface ImageItem {
  url: string;
  type: 'existing' | 'new';
  file?: File;
}

const initialFormData: ProductFormData = {
  title: '',
  description: '',
  start_price: '',
  min_price: '',
  decrease_unit: '',
  region: '',
  detail_address: '',
};

interface UseProductFormOptions {
  mode: 'create' | 'edit';
  productData?: ProductDetailAPIResponse;
  productId?: string;
}

export function useProductForm(options: UseProductFormOptions) {
  const { navigateTo, goHome } = useAppNavigation();

  // 공통 상태
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 수정 모드 전용 상태
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [initialLocation, setInitialLocation] = useState<Address | null>(null);
  const [orderedImages, setOrderedImages] = useState<ImageItem[]>([]); // 순서 정보를 포함한 이미지 배열

  // 수정 모드에서 초기 데이터 설정
  useEffect(() => {
    if (options.mode === 'edit' && options.productData) {
      const { productData } = options;

      setFormData({
        title: productData.title,
        description: productData.description,
        start_price: productData.start_price.toString(),
        min_price: productData.min_price.toString(),
        decrease_unit: productData.decrease_unit.toString(),
        region: productData.region,
        detail_address: productData.detail_address,
      });

      // 기존 이미지 설정
      if (productData.product_images?.length > 0) {
        const imageUrls = productData.product_images
          .sort((a, b) => a.image_order - b.image_order)
          .map((img) => img.image_url);
        setExistingImages(imageUrls);
      }

      // 초기 위치 정보 설정
      setInitialLocation({
        region: productData.region,
        detail_address: productData.detail_address,
      });
    }
  }, [options.mode, options.productData]);

  // 공통 입력 핸들러
  const handleInputChange = useCallback(
    (field: ProductFieldName) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev: ProductFormErrors) => ({ ...prev, [field]: '' }));
      }
    },
    [errors]
  );

  // 통합 이미지 핸들러 (새로운 시그니처에 맞게 수정)
  const handleImagesChange = useCallback((newImages: File[], existingImageUrls: string[]) => {
    setImages(newImages);
    setExistingImages(existingImageUrls);
  }, []);

  // 순서 정보를 포함한 이미지 핸들러
  const handleOrderedImagesChange = useCallback((orderedImagesData: ImageItem[]) => {
    setOrderedImages(orderedImagesData);
  }, []);

  // 수정 모드 전용 기존 이미지 핸들러 (하위 호환성을 위해 유지)
  const handleExistingImagesChange = useCallback((newExistingImages: string[]) => {
    setExistingImages(newExistingImages);
  }, []);

  // 공통 제출 핸들러
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // 이미지 검증 로직
      const totalImages =
        options.mode === 'edit' ? existingImages.length + images.length : images.length;
      if (totalImages === 0) {
        setErrors({ images: '상품 이미지를 최소 1장 이상 등록해주세요' });
        return;
      }

      // Client-side validation with Zod
      const validatedData = productWithImagesSchema.parse({ ...formData, images });

      // 통합 서비스로 상품 저장
      await saveProduct(validatedData, images, {
        mode: options.mode,
        productId: options.productId,
        existingImages: options.mode === 'edit' ? existingImages : undefined,
        orderedImages: options.mode === 'edit' ? orderedImages : undefined,
      });

      // 성공 후 처리
      const action = options.mode === 'create' ? '등록' : '수정';
      alert(`상품이 성공적으로 ${action}되었습니다!`);

      if (options.mode === 'create') {
        resetForm();
        goHome();
      } else {
        navigateTo('/mypage/sales');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        const fieldErrors: ProductFormErrors = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as ProductFieldName] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        // TODO: 토스트 메시지 또는 모달로 개선 필요
        alert(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 폼 리셋
  const resetForm = useCallback(() => {
    if (options.mode === 'edit' && options.productData) {
      setFormData({
        title: options.productData.title,
        description: options.productData.description,
        start_price: options.productData.start_price.toString(),
        min_price: options.productData.min_price.toString(),
        decrease_unit: options.productData.decrease_unit.toString(),
        region: options.productData.region,
        detail_address: options.productData.detail_address,
      });
    } else {
      setFormData(initialFormData);
    }
    setImages([]);
    setErrors({});
  }, [options.mode, options.productData]);

  return {
    formData,
    images,
    errors,
    isSubmitting,
    handleInputChange,
    handleImagesChange,
    handleSubmit,
    resetForm,
    // 수정 모드에서만 사용되는 속성들
    ...(options.mode === 'edit' && {
      existingImages,
      initialLocation,
      handleExistingImagesChange,
      handleOrderedImagesChange,
    }),
  };
}
