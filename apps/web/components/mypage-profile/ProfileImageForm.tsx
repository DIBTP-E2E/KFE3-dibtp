'use client';

import { useState, useEffect } from 'react';

import { Icon } from '@repo/ui/components';

import { NextAvatar } from '@web/components/shared';

interface ProfileImageFormProps {
  initialImageUrl: string | null;
  onImageChange: (file: File | null) => void;
  onImageDelete: () => void;
}

const ProfileImageForm = ({
  initialImageUrl,
  onImageChange,
  onImageDelete,
}: ProfileImageFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined | null>(initialImageUrl);

  useEffect(() => {
    setPreviewUrl(initialImageUrl);
  }, [initialImageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      onImageChange(file);
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
    } else {
      onImageChange(null);
      setPreviewUrl(initialImageUrl);
    }
  };

  const handleDeleteClick = () => {
    if (!initialImageUrl && !previewUrl) {
      return;
    }
    onImageDelete();
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <label
        htmlFor="profile-image-upload"
        className="relative cursor-pointer"
        aria-label="프로필 사진 업데이트하기"
      >
        <NextAvatar src={previewUrl} alt="프로필 이미지" size="max" quality={85} />
        <div className="absolute bottom-[var(--space-sm)] right-[var(--space-sm)] flex items-center justify-center w-10 h-10 bg-bg-dark text-text-inverse rounded-full pointer-events-none">
          <Icon name="Photo" size="md" color="inverse" />
        </div>
        <input
          id="profile-image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          onClick={(e) => (e.currentTarget.value = '')} // 같은 파일 재선택 시 onChange 발동을 위해
        />
      </label>
      <button
        type="button"
        onClick={handleDeleteClick}
        className={`text-sm text-text-info underline mt-2 ${!previewUrl ? 'invisible' : ''}`}
        disabled={!previewUrl}
      >
        기본 이미지로 변경
      </button>
      <p className="text-sm text-text-info">클릭하여 프로필 이미지를 변경하세요.</p>
    </div>
  );
};

export default ProfileImageForm;
