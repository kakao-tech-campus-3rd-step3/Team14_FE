import StarRating from '@/components/common/StarRating';
import type { Review } from '@/apis/review/getReview';
import FestivalContentReviewMediaSlider from './FestivalContentReviewMediaSlider';

interface FestivalContentReviewSectionProps {
  reviewsData: Review[] | undefined;
  festivalTitle: string;
}

const FestivalContentReviewSection = ({
  reviewsData,
  festivalTitle,
}: FestivalContentReviewSectionProps) => {
  if (!reviewsData) return null;
  if (reviewsData.length === 0) {
    return (
      <div className="w-full h-full flex flex-col gap-2">
        <h3 className="text-sm text-gray-900 font-bold">리뷰</h3>
        <p className="text-sm text-gray-700">첫 번째 리뷰의 주인공이 되어보세요!</p>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h3 className="text-sm text-gray-900 font-bold">리뷰 ({reviewsData.length})</h3>
      {reviewsData.map((review) => (
        <div
          key={review.reviewId}
          className="p-3 border border-gray-200 rounded-lg flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-900">{review.reviwerName}</p>
            <StarRating rating={review.score} />
          </div>

          <FestivalContentReviewMediaSlider review={review} festivalTitle={festivalTitle} />

          <p className="text-sm text-gray-700">{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default FestivalContentReviewSection;
