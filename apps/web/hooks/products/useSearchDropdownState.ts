'use client';

import { useState, useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

/**
 * SearchDropDown의 열고/닫기 상태만 관리하는 훅
 */
export const useSearchDropdownState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // 페이지 변경 시 드롭다운 닫기
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    containerRef,
    open,
    close,
  };
};
