'use client';

import { useEffect, useState } from 'react';

import HeaderContainer from '@web/components/layout/header/HeaderContainer';
import { BackButton } from '@web/components/layout/header-icon';

import LikeButton from './LikeButton';

interface ProductDetailHeaderProps {
  initialIsLiked: boolean;
}

const ProductDetailHeader = ({ initialIsLiked }: ProductDetailHeaderProps) => {
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
    <HeaderContainer
      className={`fixed top-0 md:max-w-container w-full transition-colors duration-300 border-none ${
        isBgVisible ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <BackButton />
        <LikeButton initialIsLiked={initialIsLiked} />
      </div>
    </HeaderContainer>
  );
};

export default ProductDetailHeader;
