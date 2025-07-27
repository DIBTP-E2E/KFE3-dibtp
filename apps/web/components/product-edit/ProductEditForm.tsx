'use client';

import { Button } from '@repo/ui/components';

import { useProductForm } from '@web/hooks';
import type { ProductDetailAPIResponse } from '@web/types';

import {
  ProductImage,
  TitleField,
  DescriptionField,
  StartPriceField,
  MinimumPriceField,
  DecreaseUnitField,
  LocationInfoField,
} from '../product-form';

interface ProductEditFormProps {
  productId: string;
  product: ProductDetailAPIResponse;
}

const ProductEditForm = ({ productId, product }: ProductEditFormProps) => {
  const {
    formData,
    images,
    existingImages,
    initialLocation,
    errors,
    isSubmitting,
    handleInputChange,
    handleImagesChange,
    handleExistingImagesChange,
    handleOrderedImagesChange,
    handleSubmit,
  } = useProductForm({
    mode: 'edit',
    productData: product,
    productId,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 이미지 업로드 */}
      <ProductImage
        images={images}
        existingImages={existingImages}
        onImagesChange={handleImagesChange}
        onExistingImagesChange={handleExistingImagesChange}
        onOrderedImagesChange={handleOrderedImagesChange}
        errors={errors}
      />

      {/* 상품명 */}
      <TitleField formData={formData} errors={errors} onInputChange={handleInputChange} />

      {/* 상품설명 */}
      <DescriptionField formData={formData} errors={errors} onInputChange={handleInputChange} />

      {/* 경매 시작가 */}
      <StartPriceField formData={formData} errors={errors} onInputChange={handleInputChange} />

      {/* 최저 도달가 */}
      <MinimumPriceField formData={formData} errors={errors} onInputChange={handleInputChange} />

      {/* 가격 감소 단위 */}
      <DecreaseUnitField formData={formData} errors={errors} onInputChange={handleInputChange} />

      {/* 거래 주소 */}
      <LocationInfoField
        errors={errors}
        onInputChange={handleInputChange}
        initialLocation={initialLocation}
      />

      {/* 수정 버튼 */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '수정 중...' : '상품 수정'}
      </Button>
    </form>
  );
};

export default ProductEditForm;
