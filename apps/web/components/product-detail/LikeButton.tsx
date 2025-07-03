'use client';

import { useState } from 'react';

import { Icon } from '@repo/ui/components/Icons';

export const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-full p-1 flex items-center justify-center bg-white shadow-sm"
    >
      <Icon
        name={isLiked ? 'HeartFill' : 'Heart'}
        size="xs"
        color={isLiked ? 'primary' : 'default'}
      />
    </button>
  );
};
