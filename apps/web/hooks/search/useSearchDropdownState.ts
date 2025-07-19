'use client';

import { useState, useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

/**
 * SearchDropDown의 열고/닫기 상태만 관리하는 훅
 */
export const useSearchDropdownState = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // 페이지 변경 시 드롭다운 닫기
  useEffect(() => {
    setIsOpenDropdown(false);
  }, [pathname]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpenDropdown(false);
      }
    };

    if (isOpenDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenDropdown]);

  const openDropdown = () => setIsOpenDropdown(true);
  const closeDropdown = () => setIsOpenDropdown(false);

  return {
    isOpenDropdown,
    containerRef,
    openDropdown,
    closeDropdown,
  };
};
