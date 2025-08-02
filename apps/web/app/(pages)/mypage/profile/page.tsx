'use client';
import { useState, useEffect } from 'react';

import { toast } from '@repo/ui/utils';
import { useQueryClient } from '@tanstack/react-query';

import {
  ProfileImageForm,
  ProfileNicknameForm,
  ProfileUpdateButton,
} from '@web/components/mypage-profile';
import { MY_INFO_QUERY_KEY } from '@web/constants';
import { useAppNavigation } from '@web/hooks';
import { useMyInfo } from '@web/hooks/my-info/useMyInfo';
import { updateProfile } from '@web/services/my-info/client/updateProfile';

const ProfileEditPage = () => {
  const { nickname: initialNickname, profileImage: initialImageUrl } = useMyInfo();
  const { goToMypage } = useAppNavigation();
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

      toast.success('프로필이 성공적으로 업데이트되었습니다.');

      queryClient.invalidateQueries({ queryKey: MY_INFO_QUERY_KEY });

      goToMypage();
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('프로필 업데이트 실패:', error.message);
      }

      toast.error('프로필 업데이트 실패했습니다.');
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
