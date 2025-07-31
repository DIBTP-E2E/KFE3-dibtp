'use client';
import { useState, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { updateProfile } from '@/services/my-info/client/updateProfile';

import { useMyInfo } from '@/hooks/my-info/useMyInfo';
import {
  ProfileImageForm,
  ProfileNicknameForm,
  ProfileUpdateButton,
} from '@web/components/mypage-profile';
import { MY_INFO_QUERY_KEY } from '@web/constants';

const ProfileEditPage = () => {
  const { nickname: initialNickname, profileImage: initialImageUrl } = useMyInfo();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [nickname, setNickname] = useState(initialNickname);
  const [profileImageFile, setProfileImageFile] = useState<File | null | undefined>(undefined);
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  useEffect(() => {
    if (initialNickname) {
      setNickname(initialNickname);
    }
  }, [initialNickname]);

  const handleImageChange = (file: File | null) => {
    setProfileImageFile(file);
    setIsImageDeleted(false);
  };

  const handleImageDelete = () => {
    setProfileImageFile(null);
    setIsImageDeleted(true);
  };

  const handleNicknameChange = (newNickname: string) => {
    setNickname(newNickname);
  };

  const handleUpdate = async () => {
    try {
      await updateProfile({
        nickname: nickname === initialNickname ? undefined : nickname,
        profileImage: profileImageFile,
        isImageDeleted: isImageDeleted,
        currentProfileImageUrl: initialImageUrl,
      });
      alert('프로필이 성공적으로 업데이트되었습니다.');
      queryClient.invalidateQueries({ queryKey: MY_INFO_QUERY_KEY });
      router.push('/mypage');
    } catch (error: any) {
      alert(`프로필 업데이트 실패: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <ProfileImageForm
        initialImageUrl={initialImageUrl}
        onImageChange={handleImageChange}
        onImageDelete={handleImageDelete}
      />
      <div className="w-full max-w-md space-y-6 mt-8">
        <ProfileNicknameForm initialNickname={nickname} onNicknameChange={handleNicknameChange} />
        <ProfileUpdateButton onClick={handleUpdate} />
      </div>
    </div>
  );
};

export default ProfileEditPage;
