import StarRating from '@/components/common/StarRating';

const FestivalContentStarAndReviewCount = ({
  averageScore,
  reviewCount,
}: {
  averageScore: number;
  reviewCount: number;
}) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <StarRating rating={averageScore} showScore />
      <div className="w-px h-3 bg-gray-500" />
      <p>리뷰 {reviewCount}건</p>
    </div>
  );
};

export default FestivalContentStarAndReviewCount;
