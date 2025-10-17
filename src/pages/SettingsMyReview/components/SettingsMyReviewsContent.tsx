import { useState, useEffect} from 'react';
import { getMyReviews, type MyReview } from '@/apis/review/getMyReviews';
import StarRating from '@/components/common/StarRating';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from '@/components/common/ErrorComponent';
import { deleteReview } from '@/apis/review/deleteReview';
import ImageModal,{type MediaItem} from '@/components/modal/ImageModal';

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
