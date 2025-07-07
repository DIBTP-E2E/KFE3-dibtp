import type { Product, ProductStatus } from './domain';

// 폼 데이터 타입 (상품 등록/수정 시 사용) - Product에서 불필요한 필드 제외 + 타입 변경
export interface ProductFormData
  extends Omit<
    Product,
    | 'product_id'
    | 'current_price'
    | 'view_count'
    | 'created_at'
    | 'updated_at'
    | 'seller_user_id'
    | 'product_images'
    | 'start_price'
    | 'min_price'
    | 'decrease_unit'
    | 'status'
  > {
  // 폼에서는 가격을 문자열로 입력받고, status는 선택적
  start_price: string;
  min_price: string;
  decrease_unit: string;
  status?: ProductStatus;
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
