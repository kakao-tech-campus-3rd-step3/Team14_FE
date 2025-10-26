import { useSlider } from '@/hooks/useSlider';
import LeftArrow from '@/components/icon/LeftArrowIcon';
import RightArrow from '@/components/icon/RightArrowIcon';

/**
 * 미디어 아이템 타입
 * @property type - 미디어 타입 (video 또는 image)
 * @property url - 미디어 URL
 */
export interface MediaItem {
  type: 'video' | 'image';
  url: string;
}

interface ImageModalProps {
  mediaItems: MediaItem[];
  selectedMediaIndex: number;
  onClose: () => void;
  title?: string;
}

// 드래그 임계값
const SWIPE_THRESHOLD = 50;

/**
 * 이미지/비디오를 확대해서 볼 수 있는 모달 컴포넌트
 * @param mediaItems - 표시할 미디어 아이템 배열
 * @param selectedMediaIndex - 초기 선택된 미디어 인덱스
 * @param onClose - 모달 닫기 콜백 함수
 * @param title - 모달 제목 (선택사항)
 */
const ImageModal = ({ mediaItems, selectedMediaIndex, onClose, title }: ImageModalProps) => {
  const {
    containerRef,
    touchHandlers,
    getTransformStyle,
    canGoPrevious,
    canGoNext,
    goToPrevious,
    goToNext,
    currentIndex,
  } = useSlider({
    initialIndex: selectedMediaIndex,
    itemCount: mediaItems.length,
    swipeThreshold: SWIPE_THRESHOLD,
  });

  const arrowButtonClasses =
    'absolute top-1/2 transform -translate-y-1/2 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 z-20 hidden md:flex';

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center z-[1000]"
      onClick={onClose}
    >
      <div className="relative w-full h-full max-w-[480px] p-2 flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative w-full h-full max-w-[480px] overflow-hidden"
          {...touchHandlers}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="flex transition-transform duration-300 ease-out h-full"
            style={{
              transform: getTransformStyle(),
            }}
          >
            {mediaItems.map((item, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 flex items-center justify-center p-3"
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
              {canGoPrevious && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className={`${arrowButtonClasses} left-4`}
                  aria-label="이전 미디어"
                >
                  <LeftArrow className="stroke-white" />
                </button>
              )}
              {canGoNext && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
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
            {title && <h3 className="text-white text-lg font-medium">{title}</h3>}
          </div>

          <div className="absolute bottom-4 right-4 text-white px-3 py-1 rounded-full text-sm z-20">
            {currentIndex + 1} / {mediaItems.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
