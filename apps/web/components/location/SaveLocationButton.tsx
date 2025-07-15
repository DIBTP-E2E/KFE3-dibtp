'use client';

import React, { useState, useTransition } from 'react';

import { useAppNavigation } from '@/hooks';
import { saveLocationAction } from '@/server-actions';
import type { Location } from '@/types';

interface SaveLocationButtonProps {
  selectedLocation: Location | null;
}

const SaveLocationButton = ({ selectedLocation }: SaveLocationButtonProps) => {
  const { goHome } = useAppNavigation();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSave = async () => {
    if (!selectedLocation) {
      setError('위치를 먼저 선택해주세요.');
      return;
    }

    setError(null);
    setSuccessMessage(null);

    startTransition(async () => {
      try {
        const result = await saveLocationAction(selectedLocation);

        if (result.success) {
          setSuccessMessage('위치가 저장되었습니다!');

          // 2초 후 홈페이지로 이동
          setTimeout(() => {
            goHome();
          }, 2000);
        } else {
          setError('저장에 실패했습니다.');
        }
      } catch (error) {
        console.error('저장 중 오류:', error);
        setError('저장 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    });
  };

  return (
    <div className="space-y-3">
      {/* 에러 메시지 */}
      {error && <p className="font-style-small text-text-danger text-center">{error}</p>}

      {/* 성공 메시지 */}
      {successMessage && (
        <p className="font-style-small text-text-success text-center">{successMessage}</p>
      )}

      {/* 저장 버튼 */}
      <button
        onClick={handleSave}
        disabled={!selectedLocation || isPending}
        className="w-full bg-bg-primary text-text-inverse font-style-large rounded-full py-3 text-center disabled:cursor-not-allowed"
      >
        {isPending ? <>저장 중...</> : <>위치 저장</>}
      </button>
    </div>
  );
};

export default SaveLocationButton;
