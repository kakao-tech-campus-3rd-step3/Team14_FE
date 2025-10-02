import { useState } from 'react';
import type { Review } from '@/apis/review/getReview';
import FestivalContentReviewMediaModal from './FestivalContentReviewMediaModal';

const FestivalContentReviewMediaSlider = ({
  review,
  festivalTitle,
}: {
  review: Review;
  festivalTitle: string;
}) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const mediaItems = [
    ...(review.videoUrl ? [{ type: 'video' as const, url: review.videoUrl }] : []),
    ...(review.imageUrls.length > 0
      ? review.imageUrls.map((url) => ({ type: 'image' as const, url }))
      : []),
  ];

  if (mediaItems.length === 0) return null;

  const handleMediaClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };

  return (
    <>
      <div className="relative w-full h-full">
        <div className="flex overflow-x-scroll gap-2 pb-2 h-full md:pb-4">
          {mediaItems.map((item, index) => (
            <div key={index} className="relative flex-shrink-0 size-32 rounded-lg overflow-hidden">
              {item.type === 'video' ? (
                <div className="relative w-full h-full">
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    onClick={() => handleMediaClick(index)}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-all cursor-pointer"
                    onClick={() => handleMediaClick(index)}
                  >
                    <div className="w-12 h-12 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white ml-1"
                      >
                        <path d="M8 5v14l11-7z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt="리뷰 이미지"
                  className="w-full h-full object-cover cursor-pointer transition-transform"
                  onClick={() => handleMediaClick(index)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {isImageModalOpen && (
        <FestivalContentReviewMediaModal
          mediaItems={mediaItems}
          selectedMediaIndex={selectedImageIndex}
          setSelectedMediaIndex={setSelectedImageIndex}
          onClose={() => setIsImageModalOpen(false)}
          festivalTitle={festivalTitle}
        />
      )}
    </>
  );
};

export default FestivalContentReviewMediaSlider;
