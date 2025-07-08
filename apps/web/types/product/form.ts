import type { Product } from './domain';

// 폼 데이터 타입 (상품 등록/수정 시 사용) - Product에서 필요한 필드만 선택 + 타입 변경
export interface ProductFormData
  extends Pick<Product, 'title' | 'description' | 'region' | 'detail_address'> {
  start_price: string;
  min_price: string;
  decrease_unit: string;
}

// form 필드명
export type ProductFieldName = keyof ProductFormData;

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
