import { useState } from 'react';
import Button from '@/components/common/Button';
import type { UserInfoResponse } from '@/types/UserType';
import { postReview, type PostReviewBody } from '@/apis/review/postReview';
import useNav from '@/hooks/useNav';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { jwtExchange } from '@/apis/auth/jwtExchange';
import { getCurrentToken } from '@/apis/apiInstance';

interface ReviewFormProps {
  festivalId: string;
  userInfo: UserInfoResponse['content'];
  score: number;
}
async function ensureToken() {
  if (getCurrentToken()) return;
  try {
    await jwtExchange(); 
  } catch {}
}
const ReviewForm = ({ festivalId,  score }: ReviewFormProps) => {
  const { imageInfos,  videoInfo,  isUploading, pickAndUploadImages, pickAndUploadVideo } = useMediaUpload();
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
      goBack();
    },
    onError: () => {
      alert('리뷰 작성에 실패했습니다.');
    },
  });
  const handleSubmit = async () => {
    const trimmed = content.trim();
    if (score < 1 || score > 5) return alert('별점을 선택해주세요. (1~5점)');
    if (trimmed.length < 10 || trimmed.length > 500) return alert('내용은 10자 이상 500자 이하여야 합니다.');

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
          📷 사진 업로드
        </Button>
        <Button
          variant="secondary"
          className="flex-1"
          onClick={async () => {
            pickAndUploadVideo();
          }}
        >
          🎥 동영상 업로드
        </Button>
      </div>

      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="이번 축제의 소중한 후기를 남겨주세요. 남겨주신 후기는 다른 분들이 축제를 선택할 때 큰 도움이 됩니다."
        className="w-full h-32 p-3 bg-gray-50 rounded-lg border-0 resize-none"
      />

      <div className="flex gap-3 mt-4">
        <Button variant="secondary" className="flex-1" onClick={goBack}>
          취소
        </Button>
        <Button variant="primary" className="flex-1" onClick={handleSubmit} disabled={isPending || isUploading}>
          리뷰 작성
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;
