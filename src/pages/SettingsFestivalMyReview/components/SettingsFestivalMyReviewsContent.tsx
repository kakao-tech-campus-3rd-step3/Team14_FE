import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyReviews, type MyReview } from '@/apis/review/getMyReviews';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from '@/components/common/ErrorComponent';
import { deleteReview } from '@/apis/review/deleteReview';
import ImageModal, { type MediaItem } from '@/components/modal/ImageModal';
import SettingsMyReviewsCard from '@/pages/SettingsFestivalMyReview/components/SettingsFestivalMyReviewsCard';
import EmptyComponent from '@/components/common/EmptyComponent';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import { useState, useCallback } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { showToastAxiosError } from '@/utils/showToastMessage';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { useDeleteWithConfirm } from '@/hooks/useDeleteWithConfirm';

const SettingsMyReviewsContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMediaItems, setModalMediaItems] = useState<MediaItem[]>([]);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const {
    isConfirmOpen,
    isDeleting,
    handleDelete: handleDeleteReview,
    handleConfirmDelete,
    setIsConfirmOpen,
  } = useDeleteWithConfirm(
    async (reviewId: number) => {
      await deleteReview(reviewId);
    },
    ['myReviews'],
    SYSTEM_MESSAGES.REVIEW.DELETE_SUCCESS,
    SYSTEM_MESSAGES.REVIEW.DELETE_ERROR
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['myReviews'],
      queryFn: ({ pageParam = 0 }) => getMyReviews(pageParam, 5),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.last ? undefined : allPages.length;
      },
      initialPageParam: 0,
      select: (data) => ({
        pages: data.pages,
        pageParams: data.pageParams,
      }),
    });

  const handleMediaClick = (review: MyReview, clickedIndex: number) => {
    const mediaItems: MediaItem[] = [
      ...(review.imageUrls?.map((url) => ({ type: 'image' as const, url })) || []),
      ...(review.videoUrl ? [{ type: 'video' as const, url: review.videoUrl }] : []),
    ];
    setModalMediaItems(mediaItems);
    setSelectedMediaIndex(clickedIndex);
    setIsModalOpen(true);
  };

  const fetchMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const { ref: observerRef } = useIntersectionObserver(() => {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchMore();
  });

  const reviews = data?.pages.flatMap((page) => page.data.content) || [];

  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-[400px]" message="리뷰를 불러오는 중..." />;
  }

  if (isError) {
    return (
      <ErrorComponent
        title="리뷰를 불러올 수 없습니다"
        message="잠시 후 다시 시도해주세요."
        showBackButton={true}
      />
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
      onError={(error) => {
        showToastAxiosError(error);
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

        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-300"></div>
          </div>
        )}

        {hasNextPage && <div ref={observerRef} className="h-10" />}
      </div>

      {isModalOpen && (
        <ImageModal
          mediaItems={modalMediaItems}
          selectedMediaIndex={selectedMediaIndex}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="리뷰 삭제"
        message={SYSTEM_MESSAGES.REVIEW.DELETE_CONFIRM}
      />
    </ErrorBoundary>
  );
};

export default SettingsMyReviewsContent;