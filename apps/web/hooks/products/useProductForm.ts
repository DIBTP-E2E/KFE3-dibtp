'use client';

import { useState } from 'react';

import { z } from 'zod';

import { productSchema } from '@/lib/validations';

import { registerProduct } from '@/services';
import type { ProductFormData, ProductFormErrors, ProductFieldName } from '@/types';

const initialFormData: ProductFormData = {
  title: '',
  description: '',
  start_price: '',
  min_price: '',
  decrease_unit: '',
  region: '',
  detail_address: '',
};

export const useProductForm = () => {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange =
    (field: ProductFieldName) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

  const handleImagesChange = (newImages: File[]) => {
    setImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Client-side validation with Zod
      const validatedData = productSchema.parse(formData);

      // Register product using API service
      await registerProduct(validatedData, images);

      // TODO: 토스트 메시지 또는 모달로 개선 필요
      alert('상품이 성공적으로 등록되었습니다!');
      resetForm();
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

  const resetForm = () => {
    setFormData(initialFormData);
    setImages([]);
    setErrors({});
  };

  return {
    formData,
    images,
    errors,
    isSubmitting,
    handleInputChange,
    handleImagesChange,
    handleSubmit,
    resetForm,
  };
};
