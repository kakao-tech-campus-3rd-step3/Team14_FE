import { useState, useEffect, useCallback } from 'react';
import { getMyReviews, type MyReview } from '@/apis/review/getMyReviews';
import StarRating from '@/components/common/StarRating';
import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from '@/components/common/ErrorComponent';
import LeftArrow from '@/components/icon/LeftArrowIcon';

type Viewer =
  | { type: 'image'; srcList: string[]; index: number }
  | { type: 'video'; src: string }
  | null;

const MyReviewsPage = () => {
  const [reviews, setReviews] = useState<MyReview[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [viewer, setViewer] = useState<Viewer>(null);

  const openImage = (srcList: string[], index: number) =>
    setViewer({ type: 'image', srcList, index });
  const openVideo = (src: string) => setViewer({ type: 'video', src });
  const closeViewer = () => setViewer(null);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!viewer) return;
      if (e.key === 'Escape') closeViewer();
      if (viewer.type === 'image') {
        if (e.key === 'ArrowRight') {
          setViewer((v) =>
            v && v.type === 'image'
              ? {
                  ...v,
                  index: (v.index + 1) % v.srcList.length,
                }
              : v,
          );
        }
        if (e.key === 'ArrowLeft') {
          setViewer((v) =>
            v && v.type === 'image'
              ? {
                  ...v,
                  index: (v.index - 1 + v.srcList.length) % v.srcList.length,
                }
              : v,
          );
        }
      }
    },
    [viewer],
  );

  useEffect(() => {
    if (!viewer) return;
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [viewer, onKeyDown]);

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
      <Container>
        <Header variant="page" title="내가 작성한 리뷰" />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-300"></div>
          <p className="ml-2 text-gray-600">리뷰를 불러오는 중...</p>
        </div>
        <Footer />
      </Container>
    );
  }

  if (reviews.length === 0) {
    return (
      <Container>
        <Header variant="page" title="내가 작성한 리뷰" />
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 text-lg">작성한 리뷰가 없습니다.</p>
          <p className="text-gray-400 text-sm mt-1">축제를 방문하고 첫 리뷰를 작성해보세요!</p>
        </div>
        <Footer />
      </Container>
    );
  }

  return (
    <Container>
      <Header variant="page" title="내가 작성한 리뷰" />
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

                <p className="text-gray-700 mb-3 whitespace-pre-wrap">{review.content}</p>

                {review.imageUrls && review.imageUrls.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {review.imageUrls.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => openImage(review.imageUrls, index)}
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
                      onClick={() => openVideo(review.videoUrl!)}
                    />
                  </div>
                )}

                <div className="text-sm text-gray-500">작성자: {review.reviewerName}</div>
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

        {viewer && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75"
            onClick={closeViewer}
          >
            <div
              className="relative max-w-[92vw] max-h-[88vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeViewer}
                className="absolute -top-10 right-0 text-white text-2xl"
                aria-label="닫기"
              >
                ✕
              </button>

              {viewer.type === 'image' ? (
                <>
                  {viewer.srcList.length > 1 && (
                    <button
                      className="absolute left-0 p-3 text-white text-2xl"
                      onClick={() =>
                        setViewer((v) =>
                          v && v.type === 'image'
                            ? {
                                ...v,
                                index: (v.index - 1 + v.srcList.length) % v.srcList.length,
                              }
                            : v,
                        )
                      }
                      aria-label="이전 이미지"
                    >
                      <LeftArrow className="stroke-white" />
                    </button>
                  )}

                  <img
                    src={viewer.srcList[viewer.index]}
                    alt="리뷰 이미지 확대"
                    className="max-w-[92vw] max-h-[88vh] object-contain rounded"
                  />

                  {viewer.srcList.length > 1 && (
                    <button
                      className="absolute right-0 p-3 text-white text-2xl"
                      onClick={() =>
                        setViewer((v) =>
                          v && v.type === 'image'
                            ? { ...v, index: (v.index + 1) % v.srcList.length }
                            : v,
                        )
                      }
                      aria-label="다음 이미지"
                    >
                      <LeftArrow className="stroke-white rotate-180" />
                    </button>
                  )}
                </>
              ) : (
                <video
                  src={viewer.src}
                  controls
                  autoPlay
                  className="max-w-[92vw] max-h-[88vh] rounded"
                />
              )}
            </div>
          </div>
        )}
      </ErrorBoundary>
      <Footer />
    </Container>
  );
};

export default MyReviewsPage;
