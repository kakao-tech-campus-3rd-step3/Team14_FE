import { useState, useRef } from 'react';
import LeftArrow from '@/components/icon/LeftArrowIcon';
import RightArrow from '@/components/icon/RightArrowIcon';

interface MediaItem {
  type: 'video' | 'image';
  url: string;
}

interface FestivalContentReviewMediaModalProps {
  mediaItems: MediaItem[];
  selectedMediaIndex: number;
  setSelectedMediaIndex: (index: number) => void;
  onClose: () => void;
  festivalTitle?: string;
}

// 드래그 임계값
const SWIPE_THRESHOLD = 50;

const FestivalContentReviewMediaModal = ({
  mediaItems,
  selectedMediaIndex,
  setSelectedMediaIndex,
  onClose,
  festivalTitle,
}: FestivalContentReviewMediaModalProps) => {
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
      if (translateX > 0 && selectedMediaIndex > 0) {
        setSelectedMediaIndex(selectedMediaIndex - 1);
      } else if (translateX < 0 && selectedMediaIndex < mediaItems.length - 1) {
        setSelectedMediaIndex(selectedMediaIndex + 1);
      }
    }
    setIsDragging(false);
    setTranslateX(0);
  };

  const arrowButtonClasses =
    'absolute top-1/2 transform -translate-y-1/2 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 z-20 hidden md:flex';

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center z-[1000]"
      onClick={onClose}
    >
      <div className="relative w-full h-full max-w-[480px] p-4 flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative w-full h-full max-w-[480px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="flex transition-transform duration-300 ease-out h-full"
            style={{
              transform: `translateX(${-selectedMediaIndex * 100 + (isDragging ? (translateX / (containerRef.current?.offsetWidth || 1)) * 100 : 0)}%)`,
            }}
          >
            {mediaItems.map((item, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 flex items-center justify-center"
              >
                {item.type === 'video' ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-black">
                    <video
                      src={item.url}
                      className="w-full h-full object-contain"
                      controls
                      playsInline
                      preload="metadata"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt="확대된 리뷰 이미지"
                    className="w-full h-full object-contain select-none"
                    draggable={false}
                  />
                )}
              </div>
            ))}
          </div>

          {mediaItems.length > 1 && (
            <>
              {selectedMediaIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMediaIndex(selectedMediaIndex - 1);
                  }}
                  className={`${arrowButtonClasses} left-4`}
                  aria-label="이전 미디어"
                >
                  <LeftArrow className="stroke-white" />
                </button>
              )}
              {selectedMediaIndex < mediaItems.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMediaIndex(selectedMediaIndex + 1);
                  }}
                  className={`${arrowButtonClasses} right-4`}
                  aria-label="다음 미디어"
                >
                  <RightArrow className="stroke-white" />
                </button>
              )}
            </>
          )}

          <div className="absolute top-0 left-0 flex items-center gap-3 z-20">
            <button
              onClick={onClose}
              className="w-10 h-10 text-white rounded-full flex items-center justify-center transition-all text-xl cursor-pointer"
              aria-label="모달 닫기"
            >
              ×
            </button>
            {festivalTitle && <h3 className="text-white text-lg font-medium">{festivalTitle}</h3>}
          </div>

          <div className="absolute bottom-4 right-4 text-white px-3 py-1 rounded-full text-sm z-20">
            {selectedMediaIndex + 1} / {mediaItems.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalContentReviewMediaModal;
