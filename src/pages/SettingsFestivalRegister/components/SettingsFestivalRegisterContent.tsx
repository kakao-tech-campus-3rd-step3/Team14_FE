import useNav from '@/hooks/useNav';
import { useState } from 'react';
import RegisterFestivalNameCard from '@/pages/SettingsFestivalRegister/components/RegisterFestivalNameCard';
import RegisterFestivalAreaCard from '@/pages/SettingsFestivalRegister/components/RegisterFestivalAreaCard';
import RegisterFestivalAddressCard from '@/pages/SettingsFestivalRegister/components/RegisterFestivalAddressCard';
import RegisterFestivalPeriodCard from '@/pages/SettingsFestivalRegister/components/RegisterFestivalPeriodCard';
import RegisterFestivalHomePageCard from '@/pages/SettingsFestivalRegister/components/RegisterFestivalHomePageCard';
import RegisterFestivalOverviewCard from '@/pages/SettingsFestivalRegister/components/RegisterFestivalOverviewCard';
import RegisterFestivalPosterCard from '@/pages/SettingsFestivalRegister/components/RegisterFestivalPosterCard';
import RegisterFestivalImageCard from '@/pages/SettingsFestivalRegister/components/RegisterFestivalImageCard';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import { useImageUploadWithPreview } from '@/hooks/useImageUploadWithPreview';
import { validateFestivalForm } from '@/utils/festivalValidation';

const SettingsFestivalRegisterContent = () => {
  const { goBack } = useNav();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingPoster, setIsUploadingPoster] = useState(false);

  // 폼 데이터
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

  // 포스터 관련 state 
  const [posterInfo, setPosterInfo] = useState<{ id: number; presignedUrl: string } | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);

  const {
    imageInfos,
    imagePreviews,
    isUploading: isUploadingImages,
    handleImagesUpload,
    removeImage: handleRemoveImage,
  } = useImageUploadWithPreview(10);

  // 폼 입력 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출
  const handleSubmit = async () => {
    const validation = validateFestivalForm(formData, posterInfo, imageInfos);
    if (!validation.isValid) {
      alert(validation.errorMessage);
      return;
    }

    try {
      setIsSubmitting(true);

      alert('축제가 성공적으로 등록되었습니다!');
      goBack();
    } catch (error: any) {
      console.error('축제 등록 실패:', error);

      if (error.response?.data?.fieldErrors) {
        const fieldErrors = error.response.data.fieldErrors;
        const errorMessages = fieldErrors
          .map((error: any) => `${Object.keys(error)[0]}: ${Object.values(error)[0]}`)
          .join('\n');
        alert(`입력 오류:\n${errorMessages}`);
        return;
      }

      if (error.response?.status === 403) {
        alert('축제 등록 권한이 없습니다. 축제 관리자 승인이 필요합니다.');
      } else {
        alert('축제 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isUploading = isUploadingPoster || isUploadingImages;

  return (
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

        <RegisterFestivalImageCard
          imagePreviews={imagePreviews}
          handleRemoveImage={handleRemoveImage}
          isSubmitting={isSubmitting}
          isUploading={isUploading}
          imageInfos={imageInfos}
          handleImagesUpload={handleImagesUpload}
          isUploadingImages={isUploadingImages}
        />

        <FormSubmitButtons
          onCancel={goBack}
          onSubmit={handleSubmit}
          isDisabled={isSubmitting || isUploading}
          isLoading={isSubmitting}
          submitLabel="축제 등록"
          cancelLabel="취소"
        />
      </div>
    </div>
  );
};

export default SettingsFestivalRegisterContent;
