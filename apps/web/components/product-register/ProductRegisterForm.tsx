'use client';

import { useState } from 'react';

import { Button, BottomSheet, Icon } from '@repo/ui/components';

import { useProductForm } from '@/hooks';

import {
  ProductImage,
  TitleField,
  DescriptionField,
  StartPriceField,
  MinimumPriceField,
  DecreaseUnitField,
  LocationInfoField,
} from '../product-form';

const ProductRegisterForm = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const {
    formData,
    images,
    errors,
    isSubmitting,
    handleInputChange,
    handleImagesChange,
    submitForm,
  } = useProductForm({ mode: 'create' });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setIsConfirmModalOpen(false);
    await submitForm();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* 이미지 업로드 */}
        <ProductImage images={images} errors={errors} onImagesChange={handleImagesChange} />

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
        <LocationInfoField errors={errors} onInputChange={handleInputChange} />

        {/* 등록 버튼 */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '등록 중...' : '상품 등록'}
        </Button>
      </form>

      {/* 경매 즉시 시작 확인 모달 */}
      <BottomSheet
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        aria-label="경매 즉시 시작 안내"
      >
        <div className="flex flex-col gap-lg p-sm">
          <div className="text-text-primary flex flex-col gap-md items-center">
            <Icon name="Warning" size="xl" />
            <p className="font-style-large">상품을 등록하면 즉시 경매가 시작됩니다.</p>
            <p className="font-style-medium text-text-info">
              등록 후에는 경매를 중지할 수 있지만,
              <br />
              경매 중인 상품은 수정할 수 없습니다.
            </p>
          </div>

          <div className="flex gap-sm">
            <Button
              variant="outlined"
              onClick={() => setIsConfirmModalOpen(false)}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              variant="fulled"
              color="primary"
              onClick={handleConfirmSubmit}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? '등록 중...' : '등록하기'}
            </Button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default ProductRegisterForm;
