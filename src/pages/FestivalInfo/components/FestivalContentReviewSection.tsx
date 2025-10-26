import StarRating from '@/components/common/StarRating';
import type { Review } from '@/apis/review/getReview';
import FestivalContentReviewMediaSlider from '@/pages/FestivalInfo/components/FestivalContentReviewMediaSlider';

interface FestivalContentReviewSectionProps {
  reviewsData: Review[] | undefined;
  festivalTitle: string;
}
import { useAuth } from '@/context/AuthContext';
import { useDeleteWithConfirm } from '@/hooks/useDeleteWithConfirm';
import { deleteReview } from '@/apis/review/deleteReview';
import ConfirmModal from '@/components/modal/ConfirmModal';
import PickIcon from '@/components/common/PickIcon';
import { PICK_ICONS } from '@/constants/pickIcons';

/**
 * 축제 내용 리뷰 섹션
 * @param reviewsData - 리뷰 데이터
 * @param festivalTitle - 축제 제목
 * @returns 축제 내용 리뷰 섹션
 */
const FestivalContentReviewSection = ({
  reviewsData,
  festivalTitle,
}: FestivalContentReviewSectionProps) => {
  const { userInfo } = useAuth();

  const { isConfirmOpen, handleDelete, handleConfirmDelete, setIsConfirmOpen } =
    useDeleteWithConfirm(
      deleteReview,
      ['reviews'],
      '리뷰가 삭제되었습니다.',
      '리뷰 삭제에 실패했습니다.',
    );

  const isMyReview = (review: Review) => {
    return userInfo?.userId === review.userId;
  };

  const handleEditReview = (reviewId: number) => {
    // 리뷰 수정 로직
  };

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
            <p className="font-medium text-gray-900">{review.reviewerName}</p>
            <div className="flex items-center gap-2">
              <StarRating rating={review.score} />
              {isMyReview(review) && (
                <div className="flex gap-1">
                  <button onClick={() => handleEditReview(review.reviewId)} aria-label="리뷰 수정">
                    <PickIcon name={PICK_ICONS.EDIT} size={40} />
                  </button>
                  <button onClick={() => handleDelete(review.reviewId)} aria-label="리뷰 삭제">
                    <PickIcon name={PICK_ICONS.DELETE} size={45} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <FestivalContentReviewMediaSlider review={review} festivalTitle={festivalTitle} />
          <p className="text-sm text-gray-700">{review.content}</p>
        </div>
      ))}

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="리뷰 삭제"
        message="정말로 이 리뷰를 삭제하시겠습니까?"
      />
    </div>
  );
};
export default FestivalContentReviewSection;
