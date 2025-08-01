'use client';

import { useState, useEffect } from 'react';

import { Input, Label } from '@repo/ui/components';

interface ProfileNicknameFormProps {
  initialNickname: string;
  onNicknameChange: (nickname: string) => void;
}

const ProfileNicknameForm = ({ initialNickname, onNicknameChange }: ProfileNicknameFormProps) => {
  const [nickname, setNickname] = useState(initialNickname);

  useEffect(() => {
    setNickname(initialNickname);
  }, [initialNickname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
    onNicknameChange(newNickname);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="nickname">닉네임</Label>
      <Input
        id="nickname"
        name="nickname"
        value={nickname}
        onChange={handleChange}
        placeholder="닉네임을 입력해주세요."
      />
    </div>
  );
};

export default ProfileNicknameForm;
