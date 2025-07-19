'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseKeyboardNavigationProps {
  items: string[];
  isEnabled: boolean;
  onSelect?: (item: string, index: number) => void;
  onEscape?: () => void;
  eventPriority?: number; // 이벤트 핸들러 우선순위 (높을수록 우선)
}

/**
 * 범용 키보드 네비게이션 훅
 * 화살표 키로 리스트 순회, 엔터로 선택, ESC로 취소
 */
// 전역 우선순위 관리
let currentMaxPriority = -1;

export const useKeyboardNavigation = ({
  items,
  isEnabled,
  onSelect,
  onEscape,
  eventPriority = 0,
}: UseKeyboardNavigationProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const resetSelection = useCallback(() => {
    setSelectedIndex(-1);
  }, []); // 빈 의존성 배열로 안정적인 참조 유지

  // 키보드 이벤트 핸들러
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isEnabled || items.length === 0) return;

      // 이벤트 우선순위 체크: 현재 활성화된 네비게이션 중 가장 높은 우선순위만 처리
      if (eventPriority < currentMaxPriority) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          event.stopPropagation(); // 다른 키보드 네비게이션과 충돌 방지
          setSelectedIndex((prev) => (prev + 1) % items.length);
          break;

        case 'ArrowUp':
          event.preventDefault();
          event.stopPropagation(); // 다른 키보드 네비게이션과 충돌 방지
          setSelectedIndex((prev) => (prev <= 0 ? items.length - 1 : prev - 1));
          break;

        case 'Enter':
          event.preventDefault();
          event.stopPropagation(); // 다른 키보드 네비게이션과 충돌 방지
          if (selectedIndex >= 0 && selectedIndex < items.length) {
            const selectedItem = items[selectedIndex];
            if (selectedItem && onSelect) {
              onSelect(selectedItem, selectedIndex);
            }
          }
          break;

        case 'Escape':
          event.preventDefault();
          event.stopPropagation(); // 다른 키보드 네비게이션과 충돌 방지
          onEscape?.();
          setSelectedIndex(-1);
          break;

        default:
          // 네비게이션 키가 아닌 다른 키 입력 시에만 선택 상태 초기화
          if (!['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key)) {
            setSelectedIndex(-1);
          }
          break;
      }
    };

    if (isEnabled) {
      // 현재 최대 이벤트 우선순위 업데이트
      currentMaxPriority = Math.max(currentMaxPriority, eventPriority);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      // 컴포넌트 언마운트 시 이벤트 우선순위 재계산
      if (isEnabled && eventPriority === currentMaxPriority) {
        currentMaxPriority = -1;
      }
    };
  }, [isEnabled, items, onSelect, onEscape, eventPriority, selectedIndex]);

  return {
    selectedIndex,
    resetSelection,
  };
};
