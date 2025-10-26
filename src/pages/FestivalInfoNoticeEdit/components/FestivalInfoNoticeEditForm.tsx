import { generatePath, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { putFestivalNotice } from '@/apis/notice/putFestivalNotice';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import type { NoticeUpdateRequest } from '@/types/Notice';
import FestivalInfoNoticeRuleCard from '@/pages/FestivalInfoNoticeCreate/components/FestivalInfoNoticeRuleCard';
import useNav from '@/hooks/useNav';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { ROUTE_PATH } from '@/constants/routes';
import FestivalInfoNoticeInfoCard from '@/pages/FestivalInfoNoticeCreate/components/FestivalInfoNoticeInfoCard';
import type { FestivalInfo } from '@/types/FestivalType';
import type { Notice } from '@/types/Notice';
import { useState, useEffect } from 'react';
import { queryClient } from '@/utils/queryClient';
import { showToastAxiosError, showToastSuccessMessage } from '@/utils/showToastMessage';
import TextInputWithCounter from '@/components/form/TextInputWithCounter';
import MediaUploadSection from '@/components/form/MediaUploadSection';
import { showToastErrorMessage } from '@/utils/showToastMessage';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';

interface FestivalInfoNoticeEditFormProps {
  festivalData: FestivalInfo;
  noticeData: Notice;
  noticeId: string;
}
/**
 * 공지사항 수정 폼 컴포넌트
 * @param festivalData - 축제 데이터
 * @param noticeData - 공지사항 데이터
 * @param noticeId - 공지사항 ID
 * @returns 공지사항 수정 폼 컴포넌트
 */
const FestivalInfoNoticeEditForm = ({
  festivalData,
  noticeData,
  noticeId,
}: FestivalInfoNoticeEditFormProps) => {
  const { goBack } = useNav();
  const navigate = useNavigate();

  // 기존 데이터로 초기화
  const [title, setTitle] = useState(noticeData.title);
  const [content, setContent] = useState(noticeData.content);

  const { imageInfos, setImageInfos, isUploading, pickAndUploadImages, removeImage } =
    useMediaUpload({ maxImages: 10, enableVideo: false });

  // 기존 이미지들을 초기값으로 설정
  useEffect(() => {
    if (noticeData.images && noticeData.images.length > 0) {
      const existingImages = noticeData.images.map((url, index) => ({
        id: index + 1,
        presignedUrl: url,
      }));
      setImageInfos(existingImages);
    }
  }, [noticeData.images, setImageInfos]);

  const { mutate: submitApplication, isPending } = useMutation({
    mutationFn: (body: NoticeUpdateRequest) => putFestivalNotice(noticeId, body),
    onSuccess: () => {
      // 관련 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: ['festival-notices'] });

      showToastSuccessMessage('공지사항이 수정되었습니다.');
      navigate(
        generatePath(ROUTE_PATH.FESTIVAL_NOTICES, { festivalId: festivalData.id.toString() }),
      );
    },
    onError: (error: unknown) => {
      showToastAxiosError(error);
    },
  });

  const handleSubmit = () => {
    if (!title.trim()) {
      return showToastErrorMessage(SYSTEM_MESSAGES.INPUT_FORM.TITLE_REQUIRED);
    }
    if (!content.trim()) {
      return showToastErrorMessage(SYSTEM_MESSAGES.INPUT_FORM.CONTENT_REQUIRED);
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

        <TextInputWithCounter
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="공지사항 제목을 입력하세요"
          maxLength={100}
        />

        <MediaUploadSection
          mediaType="image"
          mediaInfos={imageInfos}
          onUpload={pickAndUploadImages}
          onRemove={removeImage}
          isUploading={isUploading}
        />

        <TextInputWithCounter
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="공지사항 내용을 입력하세요"
          maxLength={2000}
          type="textarea"
          rows={5}
          showMinLengthMessage={true}
          minLengthMessage={SYSTEM_MESSAGES.INPUT_FORM.LENGTH_REQUIRED(10, 2000)}
          errorClassName="text-red-500"
        />

        <FormSubmitButtons
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          isDisabled={isPending || isUploading || !title.trim() || !content.trim()}
          isLoading={isPending || isUploading}
          submitLabel="공지사항 수정"
        />
      </div>
    </div>
  );
};

export default FestivalInfoNoticeEditForm;
