'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

import { PRODUCT_MAX_IMAGES } from '@web/constants';
import { validateImageFile } from '@web/utils/image';

interface Image {
  id: string;
  url: string;
  type: 'existing' | 'new';
  file?: File;
}

interface ImageItem {
  url: string;
  type: 'existing' | 'new';
  file?: File;
}

interface UseImageManagerProps {
  maxImages?: number;
  onImagesChange: (newImages: File[], existingImageUrls: string[]) => void;
  onOrderedImagesChange?: (orderedImages: ImageItem[]) => void;
  initialExistingImages?: string[];
}

export const useImageManager = ({
  maxImages = PRODUCT_MAX_IMAGES,
  onImagesChange,
  onOrderedImagesChange,
  initialExistingImages = [],
}: UseImageManagerProps) => {
  const [images, setImages] = useState<Image[]>(() =>
    initialExistingImages.map((url, index) => ({
      id: `existing-${index}`,
      url,
      type: 'existing' as const,
    }))
  );

  // 초기 로딩 완료 여부를 추적하는 ref
  const isInitializedRef = useRef(false);
  const isExternalUpdateRef = useRef(false);

  // initialExistingImages가 변경될 때 처리 (초기 로딩 시에만)
  useEffect(() => {
    // 이미 초기화되었다면 추가 업데이트 안함 (사용자 드래그 앤 드롭 우선)
    if (isInitializedRef.current) {
      return;
    }

    // 초기 이미지가 있다면 설정
    if (initialExistingImages.length > 0) {
      isExternalUpdateRef.current = true; // 외부 업데이트 플래그 설정

      setImages((prevImages) => {
        // 기존의 새로 업로드된 이미지들은 유지
        const newImages = prevImages.filter((img) => img.type === 'new');

        // 기존 이미지들을 새로 설정
        const existingImages = initialExistingImages.map((url, index) => ({
          id: `existing-${index}`,
          url,
          type: 'existing' as const,
        }));

        return [...existingImages, ...newImages];
      });

      // 초기화 완료 플래그 설정
      isInitializedRef.current = true;
    }
  }, [initialExistingImages]);
  const [imageErrors, setImageErrors] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getTotalImageCount = useCallback(() => images.length, [images]);

  // updateParentState 함수는 useEffect로 이동하여 제거

  const handleFileInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      const newErrors: string[] = [];

      if (files.length + images.length > maxImages) {
        newErrors.push(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다`);
        setImageErrors(newErrors);
        return;
      }

      const validFiles: File[] = [];
      files.forEach((file, index) => {
        const validation = validateImageFile(file);
        if (validation.isValid) {
          validFiles.push(file);
        } else {
          newErrors.push(`이미지 ${index + 1}: ${validation.error}`);
        }
      });

      if (validFiles.length > 0) {
        setImages((prev) => {
          const newImages = validFiles.map((file, index) => ({
            id: `new-${Date.now()}-${index}`,
            url: URL.createObjectURL(file),
            type: 'new' as const,
            file,
          }));
          return [...prev, ...newImages];
        });
      }

      setImageErrors(newErrors);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [images.length, maxImages]
  );

  const removeImage = useCallback((index: number) => {
    setImages((prev) => {
      const imageToRemove = prev[index];
      if (imageToRemove?.type === 'new' && imageToRemove.url) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prev.filter((_, i) => i !== index);
    });
    setImageErrors([]);
  }, []);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();

      if (draggedIndex === null || draggedIndex === dropIndex) {
        setDraggedIndex(null);
        return;
      }

      setImages((prev) => {
        const newImages = [...prev];
        const draggedImage = newImages[draggedIndex];

        if (draggedImage) {
          newImages.splice(draggedIndex, 1);
          newImages.splice(dropIndex, 0, draggedImage);
        }

        return newImages;
      });

      setDraggedIndex(null);
    },
    [draggedIndex]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  // images 변경 시 부모 상태 업데이트 (외부 업데이트가 아닌 경우에만)
  useEffect(() => {
    // 외부 업데이트인 경우 onImagesChange 호출하지 않음
    if (isExternalUpdateRef.current) {
      isExternalUpdateRef.current = false; // 플래그 리셋
      return;
    }

    const newImages = images
      .filter((img) => img.type === 'new' && img.file)
      .map((img) => img.file!);

    const existingImageUrls = images.filter((img) => img.type === 'existing').map((img) => img.url);

    // 기존 호환성 유지
    onImagesChange(newImages, existingImageUrls);

    // 순서 정보를 포함한 새로운 콜백 (옵셔널)
    if (onOrderedImagesChange) {
      const orderedImages: ImageItem[] = images.map((img) => ({
        url: img.url,
        type: img.type,
        file: img.file,
      }));
      onOrderedImagesChange(orderedImages);
    }
  }, [images, onImagesChange, onOrderedImagesChange]);

  return {
    images,
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
  };
};
