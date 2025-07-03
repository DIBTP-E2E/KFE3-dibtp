import z from 'zod';

import type { productSchema, productWithImagesSchema } from '@/lib/validations/product';

export type ProductFormData = z.infer<typeof productSchema>; // 상품 스키마
export type ProductWithImagesFormData = z.infer<typeof productWithImagesSchema>; // 상품 스키마 + 이미지

// form 필드명
export type ProductFieldName =
  | 'title'
  | 'description'
  | 'start_price'
  | 'min_price'
  | 'decrease_unit'
  | 'region'
  | 'detail_address';

// form 유효성 검사 및 에러 타입
export type ProductFormErrors = Partial<Record<ProductFieldName, string>>;

// form 관련 컴포넌트 props
export interface ProductFormFieldProps {
  formData: ProductFormData;
  errors: ProductFormErrors;
  onInputChange: (
    field: ProductFieldName
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
