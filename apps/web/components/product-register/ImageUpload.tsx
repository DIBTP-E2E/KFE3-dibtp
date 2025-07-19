'use client';

import { useState, useRef, useEffect } from 'react';

import { Icon, Thumbnail } from '@repo/ui/components';

import { PRODUCT_MAX_IMAGES } from '@web/constants';
import { validateMultipleImages } from '@web/lib/validations/image';

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
  images: File[];
}

interface UploadedImage {
  file: File;
  preview: string;
}

const ImageUpload = ({
  onImagesChange,
  maxImages = PRODUCT_MAX_IMAGES,
  images,
}: ImageUploadProps) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileReadersRef = useRef<FileReader[]>([]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const currentImages = [...images, ...fileArray];

    // 유효성 검사
    const validation = validateMultipleImages(currentImages, maxImages);

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    // 이미지 미리보기 생성
    const newImages: UploadedImage[] = [];
    let completedCount = 0;

    fileArray.forEach((file, index) => {
      const reader = new FileReader();
      fileReadersRef.current[index] = reader;

      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push({
            file,
            preview: e.target.result as string,
          });

          completedCount++;
          if (completedCount === fileArray.length) {
            setUploadedImages((prev) => [...prev, ...newImages]);
            onImagesChange(currentImages);
            setErrors([]);
          }
        }
      };

      reader.onerror = () => {
        setErrors((prev) => [...prev, `이미지 ${index + 1} 로드에 실패했습니다.`]);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeImage = (index: number) => {
    const newUploadedImages = uploadedImages.filter((_, i) => i !== index);
    const newImages = images.filter((_, i) => i !== index);

    // URL.revokeObjectURL로 메모리 해제
    const removedImage = uploadedImages[index];
    if (removedImage && removedImage.preview.startsWith('blob:')) {
      URL.revokeObjectURL(removedImage.preview);
    }

    setUploadedImages(newUploadedImages);
    onImagesChange(newImages);
    setErrors([]);
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    const newUploadedImages = [...uploadedImages];
    const newImages = [...images];

    const draggedUploadedImage = newUploadedImages.splice(fromIndex, 1)[0];
    const draggedImage = newImages.splice(fromIndex, 1)[0];

    if (draggedUploadedImage && draggedImage) {
      newUploadedImages.splice(toIndex, 0, draggedUploadedImage);
      newImages.splice(toIndex, 0, draggedImage);

      setUploadedImages(newUploadedImages);
      onImagesChange(newImages);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      reorderImages(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // 컴포넌트 언마운트 시 메모리 정리
  useEffect(() => {
    return () => {
      // FileReader 정리
      fileReadersRef.current.forEach((reader) => {
        if (reader.readyState === FileReader.LOADING) {
          reader.abort();
        }
      });
      fileReadersRef.current = [];

      // 미리보기 이미지 URL 정리
      uploadedImages.forEach((image) => {
        if (image.preview.startsWith('blob:')) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [uploadedImages]);

  return (
    <div className="space-y-4">
      {/* 이미지 미리보기 및 업로드 버튼 */}
      <div className="flex gap-3 select-none">
        {uploadedImages.length < maxImages && (
          <button
            type="button"
            onClick={openFileDialog}
            className="w-16 h-16 border-2 border-dashed border-border-form rounded-lg flex flex-col items-center justify-center hover:border-border-base transition-colors flex-shrink-0 cursor-pointer mt-sm"
          >
            <Icon name="Photo" />
            <span className="font-style-small">
              {uploadedImages.length}/{maxImages}
            </span>
          </button>
        )}
        <div className="flex gap-3 overflow-x-auto min-w-0 flex-1 pt-sm">
          {uploadedImages.map((image, index) => (
            <div
              key={index}
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
                imgUrl={image.preview}
                alt={`업로드된 이미지 ${index + 1}`}
                width="w-16"
                height="h-16"
                aspectRatio="square"
                rounded="sm"
                className="border border-border-base pointer-events-none"
              />
              {index === 0 && (
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

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileInput}
        className="hidden"
      />

      {/* 에러 메시지 */}
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="font-style-small text-text-error">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
