import { generatePath, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postFestivalNotice } from '@/apis/notice/postFestivalNotice';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import type { NoticeCreateRequest } from '@/types/Notice';
import FestivalInfoNoticeRuleCard from '@/pages/FestivalInfoNoticeCreate/components/FestivalInfoNoticeRuleCard';
import useNav from '@/hooks/useNav';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { isAxiosError } from 'axios';
import { ROUTE_PATH } from '@/constants/routes';
import FestivalInfoNoticeInfoCard from '@/pages/FestivalInfoNoticeCreate/components/FestivalInfoNoticeInfoCard';
import type { FestivalInfo } from '@/types/FestivalType';
import { useState } from 'react';
import Button from '@/components/common/Button';
import PickIcon from '@/components/common/PickIcon';
import { PICK_ICONS } from '@/constants/pickIcons';

const FestivalInfoNoticeForm = ({ festivalData }: { festivalData: FestivalInfo }) => {
  const navigate = useNavigate();
  const { goBack } = useNav();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { imageInfos, setImageInfos, isUploading, pickAndUploadImages, removeImage } =
    useMediaUpload({ maxImages: 10, enableVideo: false });

  const { mutate: submitApplication, isPending } = useMutation({
    mutationFn: (body: NoticeCreateRequest) => postFestivalNotice(festivalData.id.toString(), body),
    onSuccess: () => {
      alert('공지사항이 등록되었습니다.');
      navigate(generatePath(ROUTE_PATH.FESTIVAL_INFO, { festivalId: festivalData.id.toString() }));
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        if (error.response?.status === 403) {
          alert('권한이 없습니다.');
        } else if (error.response?.status === 400) {
          alert('잘못된 요청입니다.');
        } else {
          alert('공지사항 등록에 실패했습니다.');
        }
      } else {
        alert('공지사항 등록에 실패했습니다.');
      }
    },
  });

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    submitApplication({
      title: title.trim(),
      content: content.trim(),
      images: imageInfos,
    });
  };

  const handleCancel = () => {
    goBack();
  };

  return (
    <div className="bg-white rounded-lg p-4 m-4 shadow-sm">
      {festivalData && <FestivalInfoNoticeInfoCard festivalData={festivalData} />}
      <FestivalInfoNoticeRuleCard />

      <div>
        <h3 className="font-semibold mb-3">아래 빈칸을 모두 작성해주세요.</h3>

        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="공지사항 제목을 입력하세요"
            className="w-full p-3 bg-gray-50 rounded-lg border-0"
            maxLength={100}
          />
          <p className="text-xs text-gray-500 mt-1">{title.length}/100</p>
        </div>

        <div className="flex gap-2 mb-3">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={pickAndUploadImages}
            disabled={isUploading}
          >
            <PickIcon name={PICK_ICONS.CAMERA} size={20} className="mr-2" />
            {isUploading ? '업로드 중...' : '사진 업로드'}
          </Button>
        </div>

        {imageInfos.length > 0 && (
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
                    onClick={() => removeImage(index)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="공지사항 내용을 입력하세요"
          className="w-full h-32 p-3 bg-gray-50 rounded-lg border-0 resize-none"
          maxLength={2000}
        />
        <p className="text-xs text-gray-500 mt-1">{content.length}/2000</p>

        <FormSubmitButtons
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          isDisabled={isPending || isUploading || !title.trim() || !content.trim()}
          isLoading={isPending || isUploading}
          submitLabel="공지사항 작성"
        />
      </div>
    </div>
  );
};

export default FestivalInfoNoticeForm;
