import { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { getMyReviews, type MyReview } from '@/apis/review/getMyReviews';
import ErrorComponent from '@/components/common/ErrorComponent';
import { deleteReview } from '@/apis/review/deleteReview';
import ImageModal, { type MediaItem } from '@/components/modal/ImageModal';
import SettingsMyReviewsCard from '@/pages/SettingsMyReview/components/SettingsMyReviewsCard';

const SettingsMyReviewsContent = () => {
  const [reviews, setReviews] = useState<MyReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [modal, setModal] = useState<{ items: MediaItem[]; index: number } | null>(null);
  const openImage = (srcList: string[], index: number) =>
    setModal({ items: srcList.map((url) => ({ type: 'image', url })), index });
  const openVideo = (src: string) => setModal({ items: [{ type: 'video', url: src }], index: 0 });
  const closeModal = () => setModal(null);

  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm('정말로 이 리뷰를 삭제하시겠습니까?')) return;
    try {
      await deleteReview(reviewId);
      setReviews((prev) => prev.filter((r) => r.reviewId !== reviewId));
      alert('리뷰가 삭제되었습니다.');
    } catch (e) {
      console.error('리뷰 삭제 실패:', e);
      alert('리뷰 삭제에 실패했습니다.');
    }
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
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500 text-lg">작성한 리뷰가 없습니다.</p>
        <p className="text-gray-400 text-sm mt-1">축제를 방문하고 첫 리뷰를 작성해보세요!</p>
      </div>
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
              onDelete={handleDeleteReview}
              onOpenImage={openImage}
              onOpenVideo={openVideo}
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
      {modal && (
        <ImageModal
          mediaItems={modal.items}
          selectedMediaIndex={modal.index}
          onClose={closeModal}
        />
      )}
    </ErrorBoundary>
  );
};

export default SettingsMyReviewsContent;
