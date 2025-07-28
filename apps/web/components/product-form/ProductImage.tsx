'use client';

import { useCallback } from 'react';

import { Icon, Thumbnail, FormMessage } from '@repo/ui/components';

import { PRODUCT_MAX_IMAGES } from '@web/constants';
import { useImageManager } from '@web/hooks';

interface ImageItem {
  url: string;
  type: 'existing' | 'new';
  file?: File;
}

interface ProductImageProps {
  onImagesChange: (images: File[], existingImageUrls: string[]) => void;
  onExistingImagesChange?: (existingImages: string[]) => void;
  onOrderedImagesChange?: (orderedImages: ImageItem[]) => void;
  maxImages?: number;
  images: File[];
  existingImages?: string[];
  errors?: Record<string, string>;
}

const ProductImage = ({
  onImagesChange,
  onExistingImagesChange,
  onOrderedImagesChange,
  maxImages = PRODUCT_MAX_IMAGES,
  images,
  existingImages = [],
  errors = {},
}: ProductImageProps) => {
  // 콜백들을 useCallback으로 메모이제이션하여 무한 렌더링 방지
  const handleImagesChange = useCallback(
    (newImages: File[], existingImageUrls: string[]) => {
      onImagesChange(newImages, existingImageUrls);
      if (onExistingImagesChange) {
        onExistingImagesChange(existingImageUrls);
      }
    },
    [onImagesChange, onExistingImagesChange]
  );

  const {
    images: unifiedImages,
    imageErrors,
    draggedIndex,
    fileInputRef,
    getTotalImageCount,
    handleFileInput,
    removeImage,
    openFileDialog,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  } = useImageManager({
    maxImages,
    onImagesChange: handleImagesChange,
    onOrderedImagesChange,
    initialExistingImages: existingImages,
  });

  return (
    <div className="space-y-4">
      {/* 업로드 버튼과 미리보기 영역 */}
      <div className="flex items-start gap-md">
        {/* 업로드 버튼 - 최대 개수에 도달하지 않았을 때만 표시 */}
        {getTotalImageCount() < maxImages && (
          <button
            type="button"
            onClick={openFileDialog}
            className="w-16 h-16 border-2 border-dashed border-border-form rounded-lg flex flex-col items-center justify-center hover:border-border-base transition-colors flex-shrink-0 cursor-pointer mt-sm"
          >
            <Icon name="Photo" />
            <span className="font-style-small">
              {getTotalImageCount()}/{maxImages}
            </span>
          </button>
        )}
        <div className="flex gap-3 overflow-x-auto min-w-0 flex-1 pt-sm">
          {/* 통합 이미지 렌더링 */}
          {unifiedImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative flex-shrink-0 cursor-move ${
                draggedIndex === index ? 'opacity-50' : ''
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <Thumbnail
                imgUrl={image.url}
                alt={`이미지 ${index + 1}`}
                width="w-16"
                height="h-16"
                aspectRatio="square"
                rounded="sm"
                className="border border-border-base pointer-events-none"
              />
              {index === 0 && unifiedImages.length > 0 && (
                <div className="absolute bottom-0 left-0 w-full bg-black/90 text-text-inverse font-style-extra-small text-center px-1 py-0.5 pointer-events-none">
                  대표 사진
                </div>
              )}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-bg-base rounded-full w-4 h-4 flex items-center justify-center hover:bg-black hover:text-text-inverse font-style-small pointer-events-auto cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileInput}
        className="hidden"
      />

      {/* 에러 메시지 */}
      {errors.images && <FormMessage type="error">{errors.images}</FormMessage>}
      {imageErrors.length > 0 && (
        <div className="space-y-1">
          {imageErrors.map((error, index) => (
            <FormMessage key={index} type="error">
              {error}
            </FormMessage>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImage;
