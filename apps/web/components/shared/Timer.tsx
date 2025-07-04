'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TimerProps {
  startTime: string;
  currentPrice: number;
  minPrice: number;
  className?: string;
}

const TOTAL_DURATION_SECONDS = 1800;

/**
 * 30분 주기로 반복되는 타이머를 표시하는 컴포넌트입니다.
 * startTime을 기준으로 현재 30분 주기 내의 남은 시간을 계산하여 '분분:초초' 형식으로 보여줍니다.
 * currentPrice와 minPrice가 같아지면 타이머가 비활성화되고 '00:00'에 가운데 줄이 그어집니다.
 *
 * @param {string} startTime - 타이머의 시작 시간 (ISO 8601 형식 문자열). 이 시간을 기준으로 30분 주기의 남은 시간을 계산합니다.
 * @param {number} currentPrice - 현재 가격. minPrice와 같아지면 타이머가 비활성화됩니다.
 * @param {number} minPrice - 최소 가격. currentPrice와 같아지면 타이머가 비활성화됩니다.
 * @param {string} className - 타이머 컴포넌트에 적용될 CSS 클래스.
 *
 * @example
 * <Timer
 *   startTime="2025-07-01T05:30:00.000Z"
 *   currentPrice={10000}
 *   minPrice={5000}
 *   className="text-lg font-bold"
 * />
 */
const Timer: React.FC<TimerProps> = ({ startTime, currentPrice, minPrice, className }) => {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const startTimestamp = new Date(startTime).getTime();

    const updateTimer = () => {
      // currentPrice와 minPrice가 같으면 타이머를 비활성화
      if (currentPrice === minPrice) {
        setRemainingSeconds(0);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        return; // 더 이상 업데이트하지 않음
      }

      const currentTime = Date.now();
      const totalElapsedTimeMs = currentTime - startTimestamp;
      const totalElapsedTimeSeconds = Math.floor(totalElapsedTimeMs / 1000);

      // 현재 30분 주기 내에서 경과한 시간
      const elapsedInCurrentCycle =
        ((totalElapsedTimeSeconds % TOTAL_DURATION_SECONDS) + TOTAL_DURATION_SECONDS) %
        TOTAL_DURATION_SECONDS;

      // 현재 30분 주기 내에서 남은 시간
      const calculatedRemainingSeconds = TOTAL_DURATION_SECONDS - elapsedInCurrentCycle;

      setRemainingSeconds(Math.max(0, calculatedRemainingSeconds));

      // 타이머가 00:00이 되면 더 이상 requestAnimationFrame을 호출하지 않음
      if (calculatedRemainingSeconds > 0) {
        animationFrameRef.current = requestAnimationFrame(updateTimer);
      }
    };

    // 초기 실행 및 애니메이션 프레임 요청 시작
    // currentPrice 또는 minPrice가 변경될 때도 이 useEffect가 다시 실행되어 타이머 상태를 재평가
    animationFrameRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [startTime, currentPrice, minPrice]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  const isDisabled = currentPrice === minPrice;

  return (
    <div className={`${className} ${isDisabled ? 'line-through' : ''}`}>
      {formattedMinutes}:{formattedSeconds}
    </div>
  );
};

export default Timer;
