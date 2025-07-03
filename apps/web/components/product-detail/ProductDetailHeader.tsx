'use client';

import { useEffect, useState } from 'react';

import { BackButton } from './BackButton';
import { LikeButton } from './LikeButton';

export const ProductDetailHeader = () => {
  const [isBgVisible, setIsBgVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsBgVisible(true);
      } else {
        setIsBgVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-10 max-w-[375px] w-full transition-colors duration-300 ${
        isBgVisible ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="w-full mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <BackButton />
          <LikeButton />
        </div>
      </div>
    </header>
  );
};
