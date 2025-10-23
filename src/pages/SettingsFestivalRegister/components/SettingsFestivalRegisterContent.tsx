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
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { validateFestivalForm } from '@/utils/festivalValidation';
import { isAxiosError } from 'axios';
import { postFestival } from '@/apis/festivals/postFestival';
import type { PostFestivalRequest } from '@/apis/festivals/postFestival';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
/**
 * 축제 등록 내용 컴포넌트
 * @returns 축제 등록 내용 컴포넌트
 * 축제 등록 정보를 표시합니다.
 */
const SettingsFestivalRegisterContent = () => {
  const { goBack } = useNav();
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

  const [posterInfo, setPosterInfo] = useState<{ id: number; presignedUrl: string } | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);

  const {
    imageInfos,
    imagePreviews,
    isUploading: isUploadingImages,
    pickAndUploadImages,
    removeImage: handleRemoveImage,
  } = useMediaUpload({ maxImages: 10, enableVideo: false });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const validation = validateFestivalForm(formData, posterInfo, imageInfos);
    if (!validation.isValid) {
      alert(validation.errorMessage);
      return;
    }

    try {
      setIsSubmitting(true);

      // 축제 등록 API 호출
      const requestBody: PostFestivalRequest = {
        title: formData.title,
        areaCode: Number(formData.areaCode),
        addr1: formData.addr1,
        addr2: formData.addr2,
        posterInfo: posterInfo!,
        imageInfos: imageInfos,
        startDate: formData.startDate,
        endDate: formData.endDate,
        homePage: formData.homePage,
        overView: formData.overView,
      };

      await postFestival(requestBody);

      alert(SYSTEM_MESSAGES.FESTIVAL_REGISTER.SUCCESS);
      goBack();
    } catch (error) {
      console.error('축제 등록 실패:', error);

      if (isAxiosError(error) && error.response?.data?.fieldErrors) {
        const fieldErrors = error.response.data.fieldErrors as Record<string, string>[];
        const errorMessages = fieldErrors
          .map((fieldError) => `${Object.keys(fieldError)[0]}: ${Object.values(fieldError)[0]}`)
          .join('\n');
        alert(SYSTEM_MESSAGES.FESTIVAL_REGISTER.FIELD_ERROR(errorMessages));
        return;
      }

      if (isAxiosError(error) && error.response?.status === 403) {
        alert(SYSTEM_MESSAGES.FESTIVAL_REGISTER.NO_PERMISSION);
      } else {
        alert(SYSTEM_MESSAGES.FESTIVAL_REGISTER.ERROR);
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
          pickAndUploadImages={pickAndUploadImages}
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
