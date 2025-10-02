import LeftArrow from '@/components/icon/LeftArrowIcon';
import RightArrow from '@/components/icon/RightArrowIcon';
import { useState, useRef } from 'react';

// 슬라이드 전환 임계값
const SWIPE_THRESHOLD = 50;

const FestivalPoster = ({
  posterUrl,
  imageUrls,
  title,
}: {
  posterUrl: string;
  imageUrls: string[];
  title: string;
}) => {
  const allImages = [posterUrl, ...imageUrls];
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

  const handleDragEnd = () => {
    if (!isDragging) return;

    const threshold = SWIPE_THRESHOLD;

    if (Math.abs(translateX) > threshold) {
      if (translateX > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (translateX < 0 && currentIndex < allImages.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    setIsDragging(false);
    setTranslateX(0);
  };

  const arrowButtonClasses =
    'absolute top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hidden md:flex';

  return (
    <div className="w-full relative">
      <div
        ref={containerRef}
        className="relative w-full h-[500px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out h-full"
          style={{
            transform: `translateX(${-currentIndex * 100 + (isDragging ? (translateX / (containerRef.current?.offsetWidth || 1)) * 100 : 0)}%)`,
          }}
        >
          {allImages.map((imageUrl, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <img
                src={imageUrl}
                alt={`${title} - ${index + 1}`}
                className="w-full h-full object-contain select-none bg-gray-50"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* 데스크탑 화면일 때만 보입니다. */}
        {allImages.length > 1 && (
          <>
            {currentIndex > 0 && (
              <button
                onClick={() => setCurrentIndex(currentIndex - 1)}
                className={`${arrowButtonClasses} left-4`}
                aria-label="이전 이미지"
              >
                <LeftArrow className="stroke-white" />
              </button>
            )}

            {currentIndex < allImages.length - 1 && (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className={`${arrowButtonClasses} right-4`}
                aria-label="다음 이미지"
              >
                <RightArrow className="stroke-white" />
              </button>
            )}
          </>
        )}
      </div>

      {allImages.length > 1 && (
        <div className="flex justify-center mt-2 gap-1">
          {allImages.map((imageUrl, index) => (
            <button
              key={imageUrl}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary-300' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FestivalPoster;
