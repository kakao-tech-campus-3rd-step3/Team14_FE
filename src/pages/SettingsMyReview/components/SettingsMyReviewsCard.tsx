import { type MyReview } from "@/apis/review/getMyReviews";
import StarRating from "@/components/common/StarRating";

interface SettingsMyReviewsCardProps {
  review: MyReview;
  handleDeleteReview: (reviewId: number) => void;
  handleMediaClick: (review: MyReview, index: number) => void;
}

const SettingsMyReviewsCard = ({ review, handleDeleteReview, handleMediaClick }: SettingsMyReviewsCardProps) => {
  return (
    <div
key={review.reviewId}
className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
>
<div className="flex justify-between items-start mb-2">
  <h3 className="text-lg font-semibold text-gray-900">{review.festivalTitle}</h3>
  <StarRating rating={review.score} showScore />
</div>

{review.imageUrls && review.imageUrls.length > 0 && (
  <div className="flex gap-2 mb-3">
    {review.imageUrls.map((url, index) => (
      <button
        key={index}
        onClick={() => handleMediaClick(review, index)}
        className="focus:outline-none"
        aria-label={`리뷰 이미지 ${index + 1} 크게 보기`}
      >
        <img
          src={url}
          alt={`리뷰 이미지 ${index + 1}`}
          className="w-16 h-16 object-cover rounded"
        />
      </button>
    ))}
  </div>
)}
{review.videoUrl && (
  <div className="mb-3">
    <video
      src={review.videoUrl}
      controls
      className="w-full max-w-xs rounded cursor-pointer"
      onClick={() => handleMediaClick(review, (review.imageUrls?.length || 0))}
    />
  </div>
)}
<p className="text-gray-700 mb-3 whitespace-pre-wrap">{review.content}</p>
<div className="flex justify-between items-center">
  <div className="text-sm text-gray-500">작성자: {review.reviewerName}</div>
  <button
    onClick={() => handleDeleteReview(review.reviewId)}
    className="text-red-500 p-1 rounded-full"
    aria-label="리뷰 삭제"
  >
    🗑️
  </button>
</div>
</div>
  );
};

export default SettingsMyReviewsCard;