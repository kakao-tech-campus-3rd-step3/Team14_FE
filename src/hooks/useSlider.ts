import { useState, useRef } from 'react';

// 슬라이드 전환 임계값
const SWIPE_THRESHOLD = 50;

export interface UseSliderOptions {
  itemCount: number;
  swipeThreshold?: number;
}

export interface UseSliderReturn {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  isDragging: boolean;
  translateX: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  goToPrevious: () => void;
  goToNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  touchHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
  getTransformStyle: () => string;
}

/**
 * 슬라이더 기능을 제공하는 커스텀 훅
 * 터치/스와이프 제스처, 네비게이션 버튼, 인디케이터 등을 지원합니다.
 */
export const useSlider = ({
  itemCount,
  swipeThreshold = SWIPE_THRESHOLD,
}: UseSliderOptions): UseSliderReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    if (Math.abs(translateX) > swipeThreshold) {
      if (translateX > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (translateX < 0 && currentIndex < itemCount - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    setIsDragging(false);
    setTranslateX(0);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < itemCount - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < itemCount - 1;

  const getTransformStyle = () => {
    const baseTransform = -currentIndex * 100;
    const dragTransform = isDragging
      ? (translateX / (containerRef.current?.offsetWidth || 1)) * 100
      : 0;

    return `translateX(${baseTransform + dragTransform}%)`;
  };

  return {
    currentIndex,
    setCurrentIndex,
    isDragging,
    translateX,
    containerRef,
    goToPrevious,
    goToNext,
    canGoPrevious,
    canGoNext,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    getTransformStyle,
  };
};
