'use client';

import { useState, useEffect } from 'react';

interface UseKeyboardNavigationProps {
  items: string[];
  isEnabled: boolean;
  onSelect?: (item: string, index: number) => void;
  onEscape?: () => void;
}

/**
 * 범용 키보드 네비게이션 훅
 * 화살표 키로 리스트 순회, 엔터로 선택, ESC로 취소
 */
export const useKeyboardNavigation = ({
  items,
  isEnabled,
  onSelect,
  onEscape,
}: UseKeyboardNavigationProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // 키보드 이벤트 핸들러
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isEnabled || items.length === 0) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % items.length);
          break;

        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex((prev) => (prev <= 0 ? items.length - 1 : prev - 1));
          break;

        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < items.length) {
            const selectedItem = items[selectedIndex];
            if (selectedItem && onSelect) {
              onSelect(selectedItem, selectedIndex);
            }
          }
          break;

        case 'Escape':
          event.preventDefault();
          onEscape?.();
          setSelectedIndex(-1);
          break;

        default:
          // 다른 키 입력 시 선택 상태 초기화
          setSelectedIndex(-1);
          break;
      }
    };

    if (isEnabled) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnabled, items, selectedIndex, onSelect, onEscape]);

  const resetSelection = () => {
    setSelectedIndex(-1);
  };

  return {
    selectedIndex,
    resetSelection,
  };
};
