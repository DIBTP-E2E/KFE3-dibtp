'use client';

import { useState, useEffect } from 'react';

import { useMyInfo } from '@/hooks/my-info/useMyInfo';
import {
  ProfileImageForm,
  ProfileNicknameForm,
  ProfileUpdateButton,
} from '@web/components/mypage-profile';

const ProfileEditPage = () => {
  const { nickname: initialNickname, profileImage: initialImageUrl } = useMyInfo();

  const [nickname, setNickname] = useState(initialNickname);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialNickname) {
      setNickname(initialNickname);
    }
  }, [initialNickname]);

  const handleImageChange = (file: File | null) => {
    setProfileImageFile(file);
  };

  const handleNicknameChange = (newNickname: string) => {
    setNickname(newNickname);
  };

  const handleUpdate = () => {
    console.log('Updated Nickname:', nickname);
    console.log('Updated Profile Image File:', profileImageFile);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <ProfileImageForm initialImageUrl={initialImageUrl} onImageChange={handleImageChange} />
      <div className="w-full max-w-md space-y-6 mt-8">
        <ProfileNicknameForm initialNickname={nickname} onNicknameChange={handleNicknameChange} />
        <ProfileUpdateButton onClick={handleUpdate} />
      </div>
    </div>
  );
};

export default ProfileEditPage;
