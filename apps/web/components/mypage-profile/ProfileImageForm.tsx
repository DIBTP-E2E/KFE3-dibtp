'use client';

import { useState, useEffect } from 'react';

import { Avatar, Icon } from '@repo/ui/components';

interface ProfileImageFormProps {
  initialImageUrl: string | undefined;
  onImageChange: (file: File | null) => void;
}

const ProfileImageForm = ({ initialImageUrl, onImageChange }: ProfileImageFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(initialImageUrl);

  useEffect(() => {
    setPreviewUrl(initialImageUrl);
  }, [initialImageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      onImageChange(file);
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <label htmlFor="profile-image-upload" className="relative cursor-pointer">
        <Avatar src={previewUrl} alt="프로필 이미지" size="max" />
        <div className="absolute bottom-2 right-2 flex items-center justify-center w-10 h-10 bg-gray-700 text-white rounded-full pointer-events-none">
          <Icon name="Photo" size="md" color="inverse" />
        </div>
        <input
          id="profile-image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <p className="text-sm text-gray-500">클릭하여 프로필 이미지를 변경하세요.</p>
    </div>
  );
};

export default ProfileImageForm;
