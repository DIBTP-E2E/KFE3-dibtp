'use client';

import { useState } from 'react';

import { NextThumbnail } from '@web/components/shared';

import ImageCounter from './ImageCounter';
import NextButton from './NextButton';
import PrevButton from './PrevButton';

interface ProductImageCarouselProps {
  images: string[];
}

const ProductImageCarousel = ({ images }: ProductImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setTouchStartX(e.touches[0]!.clientX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches.length > 0) {
      const touchEndX = e.changedTouches[0]!.clientX;
      const deltaX = touchEndX - touchStartX;

      if (deltaX > 50) {
        goToPrevious();
      } else if (deltaX < -50) {
        goToNext();
      }
    }
  };

  if (images.length === 0) {
    return (
      <div className="flex w-full items-center justify-center bg-gray-200 aspect-square">
        <span className="text-text-info">No Image</span>
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden aspect-[4/3]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <NextThumbnail
              imgUrl={image}
              alt={`Product Image ${index + 1}`}
              aspectRatio="auto"
              quality={90}
              priority={index === currentIndex}
              loading={Math.abs(index - currentIndex) <= 1 ? 'eager' : 'lazy'}
              className="w-full h-full object-cover"
              rounded="none"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <PrevButton onClick={goToPrevious} />
          <NextButton onClick={goToNext} />
          <ImageCounter currentIndex={currentIndex} totalImages={images.length} />
        </>
      )}
    </div>
  );
};

export default ProductImageCarousel;
