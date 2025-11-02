import LeftArrow from '@/components/icon/LeftArrowIcon';
import RightArrow from '@/components/icon/RightArrowIcon';
import { useSlider } from '@/hooks/useSlider';

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
  const {
    currentIndex,
    setCurrentIndex,
    containerRef,
    goToPrevious,
    goToNext,
    canGoPrevious,
    canGoNext,
    touchHandlers,
    getTransformStyle,
  } = useSlider({ itemCount: allImages.length });

  const arrowButtonClasses =
    'absolute top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hidden sm:flex';

  return (
    <div className="w-full relative">
      <div
        ref={containerRef}
        className="relative w-full h-[500px] overflow-hidden"
        {...touchHandlers}
      >
        <div
          className="flex transition-transform duration-300 ease-out h-full"
          style={{
            transform: getTransformStyle(),
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
            {canGoPrevious && (
              <button
                onClick={goToPrevious}
                className={`${arrowButtonClasses} left-4`}
                aria-label="이전 이미지"
              >
                <LeftArrow className="stroke-white" />
              </button>
            )}

            {canGoNext && (
              <button
                onClick={goToNext}
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
