import { useState } from 'react';
import Button from '@/components/common/Button';
import type { UserInfoResponse } from '@/types/UserType';
import { postReview, type PostReviewBody } from '@/apis/review/postReview';
import useNav from '@/hooks/useNav';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { jwtExchange } from '@/apis/auth/jwtExchange';
import { getCurrentToken } from '@/apis/apiInstance';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import PickIcon from '@/components/common/PickIcon';
import { PICK_ICONS } from '@/constants/pickIcons';
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

      <div className="flex gap-2 mb-3">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={async () => {
            pickAndUploadImages();
          }}
        >
          <PickIcon name={PICK_ICONS.CAMERA} size={20} className="mr-2" />
          사진 업로드
        </Button>
        <Button
          variant="secondary"
          className="flex-1"
          onClick={async () => {
            pickAndUploadVideo?.();
          }}
        >
          <PickIcon name={PICK_ICONS.VIDEO} size={20} className="mr-2" />
          동영상 업로드
        </Button>
      </div>

      {(imageInfos.length > 0 || videoInfo) && (
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">업로드된 미디어</h4>
          <div className="flex flex-wrap gap-2">
            {imageInfos.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.presignedUrl}
                  alt={`업로드된 이미지 ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => setImageInfos((prev) => prev.filter((_, i) => i !== index))}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}

            {videoInfo && (
              <div className="relative">
                <video
                  src={videoInfo.presignedUrl}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  controls={false}
                />
                <button
                  onClick={() => setVideoInfo(null)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="이번 축제의 소중한 후기를 남겨주세요. 남겨주신 후기는 다른 분들이 축제를 선택할 때 큰 도움이 됩니다."
        className="w-full h-32 p-3 bg-gray-50 rounded-lg border-0 resize-none"
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
