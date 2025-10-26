import { useState } from 'react';
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

import {
  showToastErrorMessage,
  showToastAxiosError,
  showToastSuccessMessage,
} from '@/utils/showToastMessage';

interface ReviewFormProps {
  festivalId: string;
  userInfo: UserInfoResponse['content'];
  score: number;
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
 * 리뷰 작성 폼 컴포넌트
 * @param festivalId - 축제 ID
 * @param score - 평점
 * @returns 리뷰 작성 폼 컴포넌트
 */
const ReviewForm = ({ festivalId, score }: ReviewFormProps) => {
  const {
    imageInfos,
    setImageInfos,
    videoInfo,
    setVideoInfo,
    isUploading,
    pickAndUploadImages,
    pickAndUploadVideo,
  } = useMediaUpload();
  const [content, setContent] = useState('');
  const { goBack } = useNav();
  const queryClient = useQueryClient();

  const { mutate: mutateReview, isPending } = useMutation({
    mutationFn: (body: PostReviewBody) => postReview({ festivalId, body }),
    onSuccess: () => {
      // 상세 페이지 캐시 무효화 -> 활성화되면 자동 refetch되어서 내가 작성한 리뷰 바로 볼 수 있게
      queryClient.invalidateQueries({ queryKey: ['reviews', festivalId] });
      // 리뷰 개수/평점이 바뀐다면 함께 무효화 -> 상세 페이지 평점, 리뷰 수 등이 바로 반영되게
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
    if (score < 1 || score > 5) return showToastErrorMessage(SYSTEM_MESSAGES.REVIEW.SCORE_REQUIRED);
    if (trimmed.length < 10 || trimmed.length > 500)
      return showToastErrorMessage(SYSTEM_MESSAGES.REVIEW.CONTENT_LENGTH);

    await ensureToken(); // 제출 직전 토큰 확인
    mutateReview({
      content: trimmed,
      score,
      imageInfos: imageInfos.filter(Boolean),
      videoInfo: videoInfo || undefined,
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold mb-3">축제 후기를 남겨주세요.</h3>

      {/* 이미지 업로드 섹션 */}
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
          {/* 동영상 업로드 섹션 */}
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
        submitLabel="리뷰 작성"
      />
    </div>
  );
};

export default ReviewForm;
