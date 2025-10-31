import LoadingPage from '@/components/loading/LoadingPage';
import ErrorPage from '@/components/error/ErrorPage';
import FestivalFormNameCard from '@/components/festivalForm/FestivalformNameCard';
import FestivalFormAreaCard from '@/components/festivalForm/FestivalFormAreaCard';
import FestivalFormAddressCard from '@/components/festivalForm/FestivalFormAddressCard';
import FestivalFormPeriodCard from '@/components/festivalForm/FestivalFormPeriodCard';
import FestivalFormHomePageCard from '@/components/festivalForm/FestivalFormHomePageCard';
import FestivalFormOverviewCard from '@/components/festivalForm/FestivalFormOverviewCard';
import FestivalFormPosterCard from '@/components/festivalForm/FestivalFormPosterCard';
import MediaUploadSection from '@/components/form/MediaUploadSection';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import getFestivalInfo from '@/apis/festivals/getFestivalInfo';
import { patchFestival } from '@/apis/festivals/patchFestival';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { validateFestivalForm } from '@/utils/festivalValidation';
import { showToastAxiosError, showToastErrorMessage, showToastSuccessMessage } from '@/utils/showToastMessage';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import type { MediaInfo } from '@/types/Media/MediaInfo';
import { ROUTE_PATH } from '@/constants/routes';
import useNav from '@/hooks/useNav';
import { queryClient } from '@/utils/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { generatePath, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
/**
 * 축제 정보 수정 내용 컴포넌트
 * 기존에 축제 등록 페이지에서 활용하던 컴포넌트들을 공용으로 옮긴 뒤 재사용해서 구성하였습니다.
 * @returns 축제 정보 수정 내용 컴포넌트
 * 축제 정보 수정 정보를 표시합니다.
 */
const FestivalInfoEditContent = () => {
    const { festivalId } = useParams();

    const { data, isPending, isError } = useQuery({
      queryKey: ['festival', festivalId],
      queryFn: () => getFestivalInfo({ festivalId: festivalId || '' }),
      select: (res) => res.data.content,
      enabled: !!festivalId,
    });
  
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
  
    const { goTo } = useNav();
    const {
      imageInfos,
      isUploading: isUploadingImages,
      pickAndUploadImages,
      removeImage: handleRemoveImage,
      setImageInfos,
    } = useMediaUpload({ maxImages: 10, enableVideo: false });
  
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
      setPosterInfo({ id: 0, presignedUrl: data.posterInfo });
      setPosterPreview(data.posterInfo);
      setImageInfos((data.imageInfos ?? []).map((url: string) => ({ id: 0, presignedUrl: url })));
    }, [data, setImageInfos]);
  
    
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    
    const { mutate: submitEdit } = useMutation({
      mutationFn: (body: unknown) => patchFestival(festivalId!, body as any),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['festival', festivalId] });
        queryClient.invalidateQueries({ queryKey: ['festivals'] });       
        queryClient.invalidateQueries({ queryKey: ['search'] });          
        queryClient.invalidateQueries({ queryKey: ['reviews', festivalId] });
        showToastSuccessMessage(SYSTEM_MESSAGES.FESTIVAL_EDIT.SUCCESS);
        goTo(generatePath(ROUTE_PATH.FESTIVAL_INFO, { festivalId: festivalId! }));
      },
      onError: (e) => {
        showToastAxiosError(e);
        showToastErrorMessage(SYSTEM_MESSAGES.FESTIVAL_EDIT.ERROR);
      },
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
          posterInfo: posterInfo!,        
          imageInfos,                    
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
    <div className="p-4">
    <div className="flex flex-col gap-6">
      <FestivalFormNameCard
        formData={formData}
        handleInputChange={handleInputChange}
        isSubmitting={isSubmitting}
      />
      <FestivalFormAreaCard
        formData={formData}
        handleInputChange={handleInputChange}
        isSubmitting={isSubmitting}
      />
      <FestivalFormAddressCard
        formData={formData}
        handleInputChange={handleInputChange}
        isSubmitting={isSubmitting}
      />
      <FestivalFormPeriodCard
        formData={formData}
        handleInputChange={handleInputChange}
        isSubmitting={isSubmitting}
      />
      <FestivalFormHomePageCard
        formData={formData}
        handleInputChange={handleInputChange}
        isSubmitting={isSubmitting}
      />
      <FestivalFormOverviewCard
        formData={formData}
        handleInputChange={handleInputChange}
        isSubmitting={isSubmitting}
      />
      <FestivalFormPosterCard
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
        submitLabel="수정하기"
        cancelLabel="취소"
        isEdit
      />
    </div>
  </div>
  );
};

export default FestivalInfoEditContent;