import { useState } from 'react';
import Button from '@/components/common/Button';
import type { UserInfoResponse } from '@/types/UserType';
import { postReview, type PostReviewBody } from '@/apis/review/postReview';
import useNav from '@/hooks/useNav';
import { useMutation } from '@tanstack/react-query';

interface ReviewFormProps {
  festivalId: string;
  userInfo: UserInfoResponse['content'];
  score: number;
}

const ReviewForm = ({ festivalId, userInfo, score }: ReviewFormProps) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const { goBack } = useNav();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const { mutate: mutateReview, isPending } = useMutation({
    mutationFn: (body: PostReviewBody) => postReview({ festivalId, body }),
  });

  const handleSubmit = () => {
    const trimmed = content.trim();
    if (score < 1 || score > 5) return alert('별점을 선택해주세요. (1~5점)');
    if (trimmed.length < 10 || trimmed.length > 500) return alert('내용은 10자 이상 500자 이하여야 합니다.');

    mutateReview({
      content: trimmed,
      score,
      imageUrls: images.filter(Boolean),
      videoUrl: videoUrl ? videoUrl : undefined,
    });
    goBack();
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold mb-3">축제 후기를 남겨주세요.</h3>

      <div className="flex gap-2 mb-3">
        <Button variant="secondary" className="flex-1" onClick={() => setImages([...images, ''])}>
          📷 사진 첨부
        </Button>
        <Button variant="secondary" className="flex-1" onClick={() => setVideoUrl('')}>
          🎥 동영상 첨부
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
        <Button variant="primary" className="flex-1" onClick={handleSubmit}>
          리뷰 작성
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;
