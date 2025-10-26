import MediaUploadSection from '@/components/form/MediaUploadSection';
import type { MediaInfo } from '@/types/Media/MediaInfo';

interface RegisterFestivalImageCardProps {
  imagePreviews: string[];
  handleRemoveImage: (index: number) => void;
  isSubmitting: boolean;
  isUploading: boolean;
  imageInfos: MediaInfo[];
  pickAndUploadImages: () => void;
  isUploadingImages: boolean;
}
const RegisterFestivalImageCard = ({
  handleRemoveImage,
  isSubmitting,
  imageInfos,
  pickAndUploadImages,
  isUploadingImages,
}: RegisterFestivalImageCardProps) => {
  return (
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
  );
};

export default RegisterFestivalImageCard;
