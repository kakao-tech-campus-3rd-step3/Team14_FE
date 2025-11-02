import BorderCardComponent from '@/components/common/BorderCardComponent';
import Button from '@/components/common/Button';
import { uploadImageFiles } from '@/utils/s3Upload';
import MAX_MEDIA_SIZE from '@/constants/maxMediaSize';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import { showToastErrorMessage, showToastAxiosError } from '@/utils/showToastMessage';
/**
 * 축제 등록,수정 폼 포스터 카드
 * @param posterInfo - 포스터 정보
 * @param setPosterInfo - 포스터 정보 설정 핸들러
 * @param posterPreview - 포스터 미리보기
 * @param setPosterPreview - 포스터 미리보기 설정 핸들러
 * @param isUploadingPoster - 포스터 업로드 중 여부
 * @param setIsUploadingPoster - 포스터 업로드 중 여부 설정 핸들러
 * @param isSubmitting - 제출 중 여부
 * @param isUploading - 업로드 중 여부
 * @returns 축제 등록,수정 폼 포스터 카드 컴포넌트
 * 축제 등록,수정 폼 포스터를 표시합니다.
 */
interface FestivalFormPosterCardProps {
  posterInfo: { id: number; presignedUrl: string } | null;
  setPosterInfo: (info: { id: number; presignedUrl: string } | null) => void;
  posterPreview: string | null;
  setPosterPreview: (preview: string | null) => void;
  isUploadingPoster: boolean;
  setIsUploadingPoster: (isUploading: boolean) => void;
  isSubmitting: boolean;
  isUploading: boolean;
}

const FestivalFormPosterCard = ({
  posterInfo,
  setPosterInfo,
  posterPreview,
  setPosterPreview,
  isUploadingPoster,
  setIsUploadingPoster,
  isSubmitting,
  isUploading,
}: FestivalFormPosterCardProps) => {
  const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_MEDIA_SIZE.IMAGE) {
      showToastErrorMessage(SYSTEM_MESSAGES.POSTER.FILE_SIZE_EXCEED(MAX_MEDIA_SIZE.IMAGE));
      return;
    }

    if (!file.type.startsWith('image/')) {
      showToastErrorMessage(SYSTEM_MESSAGES.POSTER.INVALID_FILE_TYPE);
      return;
    }

    try {
      setIsUploadingPoster(true);

      // 미리보기
      const reader = new FileReader();
      reader.onload = (e) => {
        setPosterPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // S3 업로드
      const uploaded = await uploadImageFiles([file]);
      setPosterInfo(uploaded[0]);
    } catch (error) {
      showToastAxiosError(error);
      setPosterPreview(null);
      setPosterInfo(null);
    } finally {
      setIsUploadingPoster(false);
    }
  };

  return (
    <BorderCardComponent>
      <div className="flex flex-col gap-2">
        <label className="font-semibold">
          포스터 이미지 <span className="text-red-500">*</span>
        </label>
        {posterPreview && (
          <div className="relative w-full aspect-[3/4] max-w-xs mx-auto">
            <img
              src={posterPreview}
              alt="포스터 미리보기"
              className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
            />
            <button
              type="button"
              onClick={() => {
                setPosterPreview(null);
                setPosterInfo(null);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
              disabled={isSubmitting}
            >
              ×
            </button>
          </div>
        )}
        <label htmlFor="poster-upload">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            disabled={isUploading || isSubmitting}
            onClick={() => document.getElementById('poster-upload')?.click()}
          >
            {isUploadingPoster ? '업로드 중...' : posterInfo ? '포스터 변경' : '포스터 업로드'}
          </Button>
        </label>
        <input
          id="poster-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePosterUpload}
          disabled={isUploading || isSubmitting}
        />
      </div>
    </BorderCardComponent>
  );
};

export default FestivalFormPosterCard;
