import { useState } from 'react';
import Button from '@/components/common/Button';
import type { UserInfoResponse } from '@/types/UserType';
import { useNavigate } from 'react-router-dom';

interface ReviewFormProps {
  festivalId: string;
  userInfo: UserInfoResponse['content'];
}

const ReviewForm = ({ festivalId, userInfo }: ReviewFormProps) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const handleSubmit = () => {
    // 리뷰 제출 로직
    console.log('리뷰 제출:', { festivalId, userInfo, content, images });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold mb-3">축제 후기를 남겨주세요.</h3>

      {/* 첨부 버튼들 */}
      <div className="flex gap-2 mb-3">
        <Button variant="secondary" className="flex-1" onClick={() => setImages([...images, ''])}>
          📷 사진 첨부
        </Button>
        <Button variant="secondary" className="flex-1" onClick={() => setImages([...images, ''])}>
          🎥 동영상 첨부
        </Button>
      </div>

      {/* 텍스트 입력 */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="이번 축제의 소중한 후기를 남겨주세요. 남겨주신 후기는 다른 분들이 축제를 선택할 때 큰 도움이 됩니다."
        className="w-full h-32 p-3 bg-gray-50 rounded-lg border-0 resize-none"
      />

      {/* 하단 버튼 */}
      <div className="flex gap-3 mt-4">
        <Button variant="secondary" className="flex-1" onClick={() => navigate(-1)}>
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
