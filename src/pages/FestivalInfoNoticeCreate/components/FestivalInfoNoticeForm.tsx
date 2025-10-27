import { generatePath } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postFestivalNotice } from '@/apis/notice/postFestivalNotice';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import type { NoticeRequest } from '@/types/Notice';
import FestivalInfoNoticeRuleCard from '@/pages/FestivalInfoNoticeCreate/components/FestivalInfoNoticeRuleCard';
import useNav from '@/hooks/useNav';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { ROUTE_PATH } from '@/constants/routes';
import FestivalInfoNoticeInfoCard from '@/pages/FestivalInfoNoticeCreate/components/FestivalInfoNoticeInfoCard';
import type { FestivalInfo } from '@/types/FestivalType';
import { useState } from 'react';
import { queryClient } from '@/utils/queryClient';
import { showToastAxiosError, showToastSuccessMessage } from '@/utils/showToastMessage';
import { showToastErrorMessage } from '@/utils/showToastMessage';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import TextInputWithCounter from '@/components/form/TextInputWithCounter';
import MediaUploadSection from '@/components/form/MediaUploadSection';
/**
 * 공지사항 작성 폼 컴포넌트
 * @param festivalData - 축제 데이터
 * @returns 공지사항 작성 폼 컴포넌트
 */
const FestivalInfoNoticeForm = ({ festivalData }: { festivalData: FestivalInfo }) => {
  const { goTo, goBack } = useNav();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { imageInfos, isUploading, pickAndUploadImages, removeImage } = useMediaUpload({
    maxImages: 10,
    enableVideo: false,
  });

  const { mutate: submitApplication, isPending } = useMutation({
    mutationFn: (body: NoticeRequest) => postFestivalNotice(festivalData.id.toString(), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['festival-notices'] });
      showToastSuccessMessage('공지사항이 작성되었습니다.');
      goTo(generatePath(ROUTE_PATH.FESTIVAL_NOTICES, { festivalId: festivalData.id.toString() }));
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
          type="input"
        />

        <MediaUploadSection
          mediaInfos={imageInfos}
          onUpload={pickAndUploadImages}
          onRemove={removeImage}
          isUploading={isUploading}
          mediaType="image"
          maxMedia={10}
          showProgress={false}
          showCard={false}
          label=""
          layout="flex"
        />

        <TextInputWithCounter
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="공지사항 내용을 입력하세요"
          maxLength={2000}
          type="textarea"
          className="h-32 resize-none"
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
          submitLabel="공지사항 작성"
        />
      </div>
    </div>
  );
};

export default FestivalInfoNoticeForm;
