import BorderCardComponent from '@/components/common/BorderCardComponent';
import Button from '@/components/common/Button';
const RegisterFestivalImageCard = ({
  imagePreviews,
  handleRemoveImage,
  isSubmitting,
  isUploading,
  imageInfos,
  handleImagesUpload,
  isUploadingImages,
}: {
  imagePreviews: string[];
  handleRemoveImage: (index: number) => void;
  isSubmitting: boolean;
  isUploading: boolean;
  imageInfos: { id: number; presignedUrl: string }[];
  handleImagesUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploadingImages: boolean;
}) => {
  return (
    <BorderCardComponent>
      <div className="flex flex-col gap-2">
        <label className="font-semibold">
          축제 이미지 (최대 10개) <span className="text-red-500">*</span>
        </label>
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={preview}
                  alt={`이미지 ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  disabled={isSubmitting}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <label htmlFor="images-upload">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            disabled={isUploading || isSubmitting || imageInfos.length >= 10}
            onClick={() => document.getElementById('images-upload')?.click()}
          >
            {isUploadingImages ? '업로드 중...' : `이미지 추가 (${imageInfos.length}/10)`}
          </Button>
        </label>
        <input
          id="images-upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImagesUpload}
          disabled={isUploading || isSubmitting || imageInfos.length >= 10}
        />
        <p className="text-sm text-gray-500">최소 1개, 최대 10개의 이미지를 업로드해주세요.</p>
      </div>
    </BorderCardComponent>
  );
};

export default RegisterFestivalImageCard;
