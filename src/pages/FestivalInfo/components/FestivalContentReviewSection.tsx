import { useQuery } from '@tanstack/react-query';
import getReview from '@/apis/review/getReview';
import StarRating from '@/components/common/StarRating';

interface FestivalContentReviewSectionProps {
  festivalId: string;
}

const FestivalContentReviewSection = ({ festivalId }: FestivalContentReviewSectionProps) => {
  const { data } = useQuery({
    queryKey: ['reviews', festivalId],
    queryFn: () => getReview({ festivalId: festivalId }),
    select: (data) => data.data,
  });

  if (!data) return null;

  if (data.content.length === 0) {
    return (
      <div className="w-full h-full flex flex-col gap-2">
        <h3 className="text-sm text-gray-900 font-bold">리뷰</h3>
        <p className="text-sm text-gray-700">리뷰가 없습니다.</p>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h3 className="text-sm text-gray-900 font-bold">리뷰 ({data?.content.length})</h3>
      {data.content.map((review) => (
        <div key={review.reviewId} className="p-3 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-gray-900">{review.reviwerName}</p>
            <StarRating rating={review.score} />
          </div>
          <p className="text-sm text-gray-700">{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default FestivalContentReviewSection;
