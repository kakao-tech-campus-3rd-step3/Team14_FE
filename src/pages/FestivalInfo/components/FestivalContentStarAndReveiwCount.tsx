import StarRating from '@/components/common/StarRating';
import type { Review } from '@/apis/review/getReview';

const FestivalContentStarAndReveiwCount = ({
  reviewsData,
}: {
  reviewsData: Review[] | undefined;
}) => {
  if (!reviewsData) return null;
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <StarRating
        rating={
          reviewsData?.reduce((acc, review) => acc + review.score, 0) / reviewsData?.length || 0
        }
        showScore
      />
      <div className="w-px h-3 bg-gray-500" />
      <p>리뷰 {reviewsData?.length}건</p>
    </div>
  );
};

export default FestivalContentStarAndReveiwCount;
