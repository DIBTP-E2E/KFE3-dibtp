'use client';

import { useEffect, useState } from 'react';

import HeaderContainer from '@web/components/layout/header/HeaderContainer';
import { BackButton } from '@web/components/layout/header-icon';

import LikeButton from './LikeButton';

interface ProductDetailHeaderProps {
  initialIsLiked: boolean;
  title: string;
}

const ProductDetailHeader = ({ initialIsLiked, title }: ProductDetailHeaderProps) => {
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
        isBgVisible ? 'bg-bg-light shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="sr-only">{title} 상품 상세 정보 페이지</h1>
        <BackButton className="opacity-80" />
        <LikeButton initialIsLiked={initialIsLiked} className="opacity-80" />
      </div>
    </HeaderContainer>
  );
};

export default ProductDetailHeader;
