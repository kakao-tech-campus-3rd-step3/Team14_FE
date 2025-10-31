// src/pages/FestivalInfoEdit/FestivalInfoEditPage.tsx
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import LoadingPage from '@/components/loading/LoadingPage';
import ErrorPage from '@/components/error/ErrorPage';

import RegisterFestivalNameCard from '@/pages/SettingsFestivalRegister/components/RegisterFestivalNameCard';
import RegisterFestivalAreaCard from '@/pages/SettingsFestivalRegister/components/RegisterFestivalAreaCard';
import RegisterFestivalAddressCard from '@/pages/SettingsFestivalRegister/components/RegisterFestivalAddressCard';
import RegisterFestivalPeriodCard from '@/pages/SettingsFestivalRegister/components/RegisterFestivalPeriodCard';
import RegisterFestivalHomePageCard from '@/pages/SettingsFestivalRegister/components/RegisterFestivalHomePageCard';
import RegisterFestivalOverviewCard from '@/pages/SettingsFestivalRegister/components/RegisterFestivalOverviewCard';
import RegisterFestivalPosterCard from '@/pages/SettingsFestivalRegister/components/RegisterFestivalPosterCard';

import MediaUploadSection from '@/components/form/MediaUploadSection';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';

import getFestivalInfo from '@/apis/festivals/getFestivalInfo';
import { patchFestival } from '@/apis/festivals/patchFestival';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { validateFestivalForm } from '@/utils/festivalValidation';
import { showToastAxiosError, showToastErrorMessage, showToastSuccessMessage } from '@/utils/showToastMessage';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import type { MediaInfo } from '@/types/Media/MediaInfo';

const FestivalInfoEditPage = () => {
  const { festivalId } = useParams();

  // 1) 상세 조회로 초기값 가져오기
  const { data, isPending, isError } = useQuery({
    queryKey: ['festival', festivalId],
    queryFn: () => getFestivalInfo({ festivalId: festivalId || '' }),
    select: (res) => res.data.content,
    enabled: !!festivalId,
  });

  // 2) 등록 페이지와 동일한 상태 구조로 맞추기
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingPoster, setIsUploadingPoster] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    areaCode: '0',
    addr1: '',
    addr2: '',
    startDate: '',
    endDate: '',
    homePage: '',
    overView: '',
  });

  const [posterInfo, setPosterInfo] = useState<MediaInfo | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);

  const {
    imageInfos,
    isUploading: isUploadingImages,
    pickAndUploadImages,
    removeImage: handleRemoveImage,
    setImageInfos,
  } = useMediaUpload({ maxImages: 10, enableVideo: false });

  // 3) 상세값을 등록 폼 상태로 초기화
  useEffect(() => {
    if (!data) return;
    setFormData({
      title: data.title,
      areaCode: String(data.areaCode ?? '0'),
      addr1: data.addr1,
      addr2: data.addr2,
      startDate: data.startDate,
      endDate: data.endDate,
      homePage: data.homePage,
      overView: data.overView,
    });
    // 포스터/이미지: 수정 API는 MediaInfo 형태 요구
    setPosterInfo({ id: 0, presignedUrl: data.posterInfo });
    setPosterPreview(data.posterInfo);
    setImageInfos((data.imageInfos ?? []).map((url: string) => ({ id: 0, presignedUrl: url })));
  }, [data, setImageInfos]);

  // 4) 공용 핸들러 재사용
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 5) 제출: 등록과 동일한 검증을 활용하고 API만 patch로 변경
  const { mutate: submitEdit } = useMutation({
    mutationFn: (body: unknown) => patchFestival(festivalId!, body as any),
    onSuccess: () => {
      showToastSuccessMessage('축제가 수정되었습니다.');
    },
    onError: (e) => showToastAxiosError(e),
  });

  const handleSubmit = async () => {
    const validation = validateFestivalForm(formData, posterInfo, imageInfos);
    if (!validation.isValid && validation.errorMessage) {
      showToastErrorMessage(validation.errorMessage);
      return;
    }

    try {
      setIsSubmitting(true);
      await submitEdit({
        title: formData.title,
        areaCode: Number(formData.areaCode),
        addr1: formData.addr1,
        addr2: formData.addr2,
        posterInfo: posterInfo!,        // MediaInfo 단일
        imageInfos,                     // MediaInfo[]
        startDate: formData.startDate,
        endDate: formData.endDate,
        homePage: formData.homePage,
        overView: formData.overView,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) return <LoadingPage title="축제 수정" message="불러오는 중" variant="page" />;
  if (isError || !data) return <ErrorPage title="축제 수정" message="오류가 발생했습니다." variant="page" />;

  const isUploading = isUploadingPoster || isUploadingImages;

  return (
    <Container>
      <Header variant="page" title="축제 정보 수정" />
      <div className="p-4">
        <div className="flex flex-col gap-6">
          <RegisterFestivalNameCard
            formData={formData}
            handleInputChange={handleInputChange}
            isSubmitting={isSubmitting}
          />
          <RegisterFestivalAreaCard
            formData={formData}
            handleInputChange={handleInputChange}
            isSubmitting={isSubmitting}
          />
          <RegisterFestivalAddressCard
            formData={formData}
            handleInputChange={handleInputChange}
            isSubmitting={isSubmitting}
          />
          <RegisterFestivalPeriodCard
            formData={formData}
            handleInputChange={handleInputChange}
            isSubmitting={isSubmitting}
          />
          <RegisterFestivalHomePageCard
            formData={formData}
            handleInputChange={handleInputChange}
            isSubmitting={isSubmitting}
          />
          <RegisterFestivalOverviewCard
            formData={formData}
            handleInputChange={handleInputChange}
            isSubmitting={isSubmitting}
          />
          <RegisterFestivalPosterCard
            posterInfo={posterInfo}
            setPosterInfo={setPosterInfo}
            posterPreview={posterPreview}
            setPosterPreview={setPosterPreview}
            isUploadingPoster={isUploadingPoster}
            setIsUploadingPoster={setIsUploadingPoster}
            isSubmitting={isSubmitting}
            isUploading={isUploading}
          />
          <MediaUploadSection
            mediaInfos={imageInfos}
            onUpload={pickAndUploadImages}
            onRemove={handleRemoveImage}
            isUploading={isUploadingImages}
            mediaType="image"
            maxMedia={10}
            showProgress={true}
            showCard={true}
            label="축제 이미지 (최대 10개)"
            required={true}
            layout="grid"
            disabled={isSubmitting}
          />
          <FormSubmitButtons
            onCancel={() => history.back()}
            onSubmit={handleSubmit}
            onPatch={handleSubmit} 
            isDisabled={isSubmitting || isUploading}
            isLoading={isSubmitting}
            submitLabel="수정 완료"
            cancelLabel="취소"
            isEdit
          />
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default FestivalInfoEditPage;