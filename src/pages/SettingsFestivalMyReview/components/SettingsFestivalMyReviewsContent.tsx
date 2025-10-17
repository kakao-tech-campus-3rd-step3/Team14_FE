import { useState, useEffect } from 'react';
import { getMyReviews, type MyReview } from '@/apis/review/getMyReviews';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from '@/components/common/ErrorComponent';
import { deleteReview } from '@/apis/review/deleteReview';
import ImageModal, { type MediaItem } from '@/components/modal/ImageModal';
import SettingsMyReviewsCard from './SettingsFestivalMyReviewsCard';
import EmptyComponent from '@/components/common/EmptyComponent';

const SettingsMyReviewsContent = () => {
  const [reviews, setReviews] = useState<MyReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMediaItems, setModalMediaItems] = useState<MediaItem[]>([]);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm('정말로 이 리뷰를 삭제하시겠습니까?')) return;

    try {
      await deleteReview(reviewId);
      // 삭제된 리뷰를 목록에서 제거
      setReviews((prev) => prev.filter((review) => review.reviewId !== reviewId));
      alert('리뷰가 삭제되었습니다.');
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
      alert('리뷰 삭제에 실패했습니다.');
    }
  };

  const handleMediaClick = (review: MyReview, clickedIndex: number) => {
    const mediaItems: MediaItem[] = [
      ...(review.imageUrls?.map((url) => ({ type: 'image' as const, url })) || []),
      ...(review.videoUrl ? [{ type: 'video' as const, url: review.videoUrl }] : []),
    ];
    setModalMediaItems(mediaItems);
    setSelectedMediaIndex(clickedIndex);
    setIsModalOpen(true);
  };

  const loadReviews = async (page: number) => {
    try {
      setLoading(true);
      const response = await getMyReviews(page, 5);
      const newReviews = response.data.content || [];

      if (page === 0) {
        setReviews(newReviews);
      } else {
        setReviews((prev) => [...prev, ...newReviews]);
      }

      setHasMore(!response.data.last);
    } catch (err) {
      console.error('리뷰를 가져오는데 실패했습니다:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews(0);
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadReviews(nextPage);
    }
  };
  //TODO: 로딩 중 빈 컴포넌트 추가
  if (loading && reviews.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-300"></div>
        <p className="ml-2 text-gray-600">리뷰를 불러오는 중...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <EmptyComponent
        title="작성한 리뷰가 없습니다."
        description="축제를 방문하고 첫 리뷰를 작성해보세요!"
      />
    );
  }

  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <ErrorComponent
          title="리뷰를 불러올 수 없습니다"
          message="잠시 후 다시 시도해주세요."
          showBackButton={true}
        />
      )}
      onError={(error, errorInfo) => {
        console.error('MyReviewsPage Error:', error, errorInfo);
      }}
    >
      <div className="p-4">
        <div className="space-y-4">
          {reviews.map((review) => (
            <SettingsMyReviewsCard
              key={review.reviewId}
              review={review}
              handleDeleteReview={handleDeleteReview}
              handleMediaClick={handleMediaClick}
            />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
            >
              {loading ? '로딩 중...' : '더 보기'}
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ImageModal
          mediaItems={modalMediaItems}
          selectedMediaIndex={selectedMediaIndex}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </ErrorBoundary>
  );
};

export default SettingsMyReviewsContent;
