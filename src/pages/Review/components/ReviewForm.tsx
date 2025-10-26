import { useEffect, useState } from 'react';
import type { UserInfoResponse } from '@/types/UserType';
import { postReview, type PostReviewBody } from '@/apis/review/postReview';
import useNav from '@/hooks/useNav';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { jwtExchange } from '@/apis/auth/jwtExchange';
import { getCurrentToken } from '@/apis/apiInstance';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import TextInputWithCounter from '@/components/form/TextInputWithCounter';
import MediaUploadSection from '@/components/form/MediaUploadSection';
import type { Review } from '@/apis/review/getReview';
import type { ReviewUpdateRequest } from '@/apis/review/putReview';
import {
  showToastErrorMessage,
  showToastAxiosError,
  showToastSuccessMessage,
} from '@/utils/showToastMessage';
import ScoreStarRating from '@/pages/Review/components/ScoreStarRating';

interface ReviewFormProps {
  festivalId: string;
  userInfo: UserInfoResponse['content'];
  score: number;
  reviewId?: number;
  initialData?: Review;
  onSubmit?: (body: ReviewUpdateRequest) => void;
  isEditing?: boolean;
  onScoreChange?: (score: number) => void;
}

async function ensureToken() {
  if (getCurrentToken()) return;
  try {
    await jwtExchange();
  } catch (error) {
    showToastAxiosError(error);
  }
}
/**
 * 리뷰 폼
 * 수정모드일때와 리뷰 작성 모드일때의 별점 포함여부가 다릅니다.
 * @param festivalId - 축제 ID
 * @param userInfo - 사용자 정보
 * @param score - 별점
 * @param initialData - 기존 리뷰 데이터
 * @param onSubmit - 리뷰 제출 핸들러
 * @param isEditing - 수정 모드 여부
 * @param onScoreChange - 별점 변경 핸들러
 */
const ReviewForm = ({
  festivalId,
  score,
  initialData,
  onSubmit,
  isEditing = false,
  onScoreChange,
}: ReviewFormProps) => {
  const [content, setContent] = useState(initialData?.content || '');
  const [currentScore, setCurrentScore] = useState(initialData?.score || score);

  useEffect(() => {
    setCurrentScore(score);
  }, [score]);
  const handleScoreChange = (newScore: number) => {
    setCurrentScore(newScore);
    if (onScoreChange) {
      onScoreChange(newScore);
    }
  };
  const {
    imageInfos,
    setImageInfos,
    videoInfo,
    setVideoInfo,
    isUploading,
    pickAndUploadImages,
    pickAndUploadVideo,
  } = useMediaUpload();

  const { goBack } = useNav();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (initialData && isEditing) {
      const existingImages =
        initialData.imageUrls?.map((url, index) => ({
          id: index + 1,
          presignedUrl: url,
        })) || [];
      setImageInfos(existingImages);

      if (initialData.videoUrl) {
        setVideoInfo({
          id: 1,
          presignedUrl: initialData.videoUrl,
        });
      }
    }
  }, [initialData, isEditing, setImageInfos, setVideoInfo]);

  const { mutate: mutateReview, isPending } = useMutation({
    mutationFn: (body: PostReviewBody) => postReview({ festivalId, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', festivalId] });
      queryClient.invalidateQueries({ queryKey: ['festival', festivalId] });
      showToastSuccessMessage(SYSTEM_MESSAGES.REVIEW.SUBMIT_SUCCESS);
      goBack();
    },
    onError: (error) => {
      showToastAxiosError(error);
    },
  });

  const handleSubmit = async () => {
    const trimmed = content.trim();
    if (currentScore < 1 || currentScore > 5)
      return showToastErrorMessage(SYSTEM_MESSAGES.REVIEW.SCORE_REQUIRED);
    if (trimmed.length < 10 || trimmed.length > 500)
      return showToastErrorMessage(SYSTEM_MESSAGES.REVIEW.CONTENT_LENGTH);

    await ensureToken();

    if (isEditing && onSubmit) {
      onSubmit({
        content: trimmed,
        score: currentScore,
        imageInfos: imageInfos.filter(Boolean),
        videoInfo: videoInfo || undefined,
      });
    } else {
      mutateReview({
        content: trimmed,
        score: currentScore,
        imageInfos: imageInfos.filter(Boolean),
        videoInfo: videoInfo || undefined,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold mb-3">
        {isEditing ? '리뷰를 수정해주세요.' : '축제 후기를 남겨주세요.'}
      </h3>
      {isEditing && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">현재 별점</h4>
          <ScoreStarRating value={currentScore} onChange={handleScoreChange} />
        </div>
      )}
      <div className="flex flex-row gap-2 justify-center">
        <div className="flex-1">
          <MediaUploadSection
            mediaInfos={imageInfos}
            onUpload={pickAndUploadImages}
            onRemove={(index) => setImageInfos((prev) => prev.filter((_, i) => i !== index))}
            isUploading={isUploading}
            mediaType="image"
            maxMedia={10}
            showProgress={false}
            showCard={false}
            label=""
            layout="flex"
          />
        </div>
        <div className="flex-1">
          <MediaUploadSection
            mediaInfos={videoInfo ? [videoInfo] : []}
            onUpload={() => pickAndUploadVideo?.()}
            onRemove={() => setVideoInfo(null)}
            isUploading={isUploading}
            mediaType="video"
            maxMedia={1}
            showProgress={false}
            showCard={false}
            label=""
            layout="flex"
          />
        </div>
      </div>

      <TextInputWithCounter
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="이번 축제의 소중한 후기를 남겨주세요. 남겨주신 후기는 다른 분들이 축제를 선택할 때 큰 도움이 됩니다."
        maxLength={500}
        minLength={10}
        type="textarea"
        className="h-32 resize-none"
        rows={5}
        showMinLengthMessage={true}
        minLengthMessage="최소 10자 이상 입력해주세요"
      />

      <FormSubmitButtons
        onCancel={goBack}
        onSubmit={handleSubmit}
        isDisabled={isPending || isUploading}
        isLoading={isPending || isUploading}
        submitLabel={isEditing ? '리뷰 수정' : '리뷰 작성'}
      />
    </div>
  );
};

export default ReviewForm;
