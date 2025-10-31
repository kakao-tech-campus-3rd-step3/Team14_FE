import FestivalFormNameCard from '@/components/festivalForm/FestivalformNameCard';
import FestivalFormAreaCard from '@/components/festivalForm/FestivalFormAreaCard';
import FestivalFormAddressCard from '@/components/festivalForm/FestivalFormAddressCard';
import FestivalFormPeriodCard from '@/components/festivalForm/FestivalFormPeriodCard';
import FestivalFormHomePageCard from '@/components/festivalForm/FestivalFormHomePageCard';
import FestivalFormOverviewCard from '@/components/festivalForm/FestivalFormOverviewCard';
import FestivalFormPosterCard from '@/components/festivalForm/FestivalFormPosterCard';
import MediaUploadSection from '@/components/form/MediaUploadSection';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import { validateFestivalForm } from '@/utils/festivalValidation';
import { showToastErrorMessage } from '@/utils/showToastMessage';
import type { MediaInfo } from '@/types/Media/MediaInfo';
import type { FestivalFormData } from '@/types/FestivalFormTypes';
import useFestivalForm, { type UseFestivalFormInitialData } from '@/hooks/useFestivalForm';

interface FestivalFormProps {
  initial?: UseFestivalFormInitialData;
  isSubmitting: boolean;
  submitLabel?: string;
  onSubmit: (payload: {
    formData: FestivalFormData;
    posterInfo: MediaInfo;
    imageInfos: MediaInfo[];
  }) => void;
}
/**
 * 축제 등록,수정 폼 컴포넌트
 * 리팩토링한 컴포넌트들을 모아 구성한 축제 등록, 수정 폼입니다
 * @param initial - 초기 데이터
 * @param isSubmitting - 제출 중 여부
 * @param submitLabel - 제출 버튼 라벨
 * @param onSubmit - 제출 핸들러
 * @returns 축제 등록,수정 폼 컴포넌트
 * 축제 등록,수정 폼을 표시합니다.
 */
const FestivalForm = ({
  initial,
  isSubmitting,
  submitLabel = '등록하기',
  onSubmit,
}: FestivalFormProps) => {
  const {
    formData,
    handleInputChange,
    posterInfo,
    setPosterInfo,
    imageInfos,
    pickAndUploadImages,
    removeImage,
    isUploadingImages,
  } = useFestivalForm(initial);

  const isUploading = isUploadingImages;

  const handleSubmit = () => {
    const validation = validateFestivalForm(formData, posterInfo, imageInfos);
    if (!validation.isValid && validation.errorMessage) {
      showToastErrorMessage(validation.errorMessage);
      return;
    }
    onSubmit({ formData, posterInfo: posterInfo!, imageInfos });
  };

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
          posterPreview={posterInfo?.presignedUrl ?? null}
          setPosterPreview={() => {}}
          isUploadingPoster={false}
          setIsUploadingPoster={() => {}}
          isSubmitting={isSubmitting}
          isUploading={isUploading}
        />
        <MediaUploadSection
          mediaType="image"
          mediaInfos={imageInfos}
          onUpload={pickAndUploadImages}
          onRemove={removeImage}
          isUploading={isUploading}
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
          submitLabel={submitLabel}
          isEdit={submitLabel !== '등록하기'}
        />
      </div>
    </div>
  );
};

export default FestivalForm;
