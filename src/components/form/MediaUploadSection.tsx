import type { MediaInfo } from '@/types/Media/MediaInfo';
import Button from '@/components/common/Button';
import { PICK_ICONS } from '@/constants/pickIcons';
import PickIcon from '@/components/common/PickIcon';
import BorderCardComponent from '@/components/common/BorderCardComponent';

interface MediaUploadSectionProps {
  mediaInfos: MediaInfo[];
  onUpload: () => void;
  onRemove: (index: number) => void;
  isUploading: boolean;
  mediaType: 'image' | 'video';
  maxMedia?: number;
  showProgress?: boolean;
  showCard?: boolean;
  label?: string;
  required?: boolean;
  layout?: 'flex' | 'grid';
  disabled?: boolean;
}
/**
 * MediaUploadSection 컴포넌트
 * @param mediaInfos - 미디어 정보
 * @param onUpload - 미디어 업로드 핸들러
 * @param onRemove - 미디어 제거 핸들러
 * @param isUploading - 미디어 업로드 중 여부
 * @param mediaType - 미디어 타입
 * @param maxMedia - 최대 미디어 개수
 * @param showProgress - 진행 상태 표시 여부
 * @param showCard - 카드 형식 여부
 * @param label - 라벨
 * @param required - 필수 여부
 * @param layout - 레이아웃 타입
 * @param disabled - 비활성화 여부
 * @returns MediaUploadSection 컴포넌트
 */
const MediaUploadSection = ({
  mediaInfos,
  onUpload,
  onRemove,
  isUploading,
  mediaType,
  maxMedia = 10,
  showProgress = false,
  showCard = false,
  label = '미디어',
  required = false,
  layout = 'flex',
  disabled = false,
}: MediaUploadSectionProps) => {
  const content = (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-semibold">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="flex gap-2 mb-3">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={onUpload}
          disabled={isUploading || disabled || mediaInfos.length >= maxMedia}
        >
          <PickIcon
            name={mediaType === 'image' ? PICK_ICONS.CAMERA : PICK_ICONS.VIDEO}
            size={20}
            className="mr-2"
          />
          {isUploading ? '업로드 중...' : mediaType === 'image' ? '사진 업로드' : '동영상 업로드'}
        </Button>
      </div>

      {mediaInfos.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">업로드된 미디어</h4>
          <div className={layout === 'grid' ? 'grid grid-cols-3 gap-2' : 'flex flex-wrap gap-2'}>
            {mediaInfos.map((media, index) => (
              <div key={index} className={`relative ${layout === 'grid' ? 'aspect-square' : ''}`}>
                {mediaType === 'image' ? (
                  <img
                    src={media.presignedUrl}
                    alt={`업로드된 이미지 ${index + 1}`}
                    className={`${layout === 'grid' ? 'w-full h-full' : 'w-16 h-16'} object-cover rounded-lg border border-gray-200`}
                  />
                ) : (
                  <video
                    src={media.presignedUrl}
                    className={`${layout === 'grid' ? 'w-full h-full' : 'w-16 h-16'} object-cover rounded-lg border border-gray-200`}
                    controls={false}
                  />
                )}
                <button
                  onClick={() => onRemove(index)}
                  className={`absolute ${layout === 'grid' ? 'top-1 right-1 w-6 h-6' : '-top-1 -right-1 w-5 h-5'} bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600`}
                  disabled={disabled}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showProgress && (
        <p className="text-sm text-gray-500">
          최소 1개, 최대 {maxMedia}개의 {mediaType === 'image' ? '이미지' : '동영상'}을
          업로드해주세요.
        </p>
      )}
    </div>
  );

  return showCard ? <BorderCardComponent>{content}</BorderCardComponent> : content;
};
export default MediaUploadSection;
