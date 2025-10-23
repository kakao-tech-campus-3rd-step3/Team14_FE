import { useState } from 'react';
import { createImagePicker, createVideoPicker } from '@/utils/filePicker';
import type { MediaInfo } from '@/types/Media/MediaInfo';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
export interface UseMediaUploadOptions {
  maxImages?: number;
  enableVideo?: boolean;
}

/**
 * 미디어 업로드 훅
 * @param options - 미디어 업로드 옵션
 * @returns 미디어 업로드 훅
 */
export function useMediaUpload(options: UseMediaUploadOptions = {}) {
  const { maxImages = 10, enableVideo = true } = options;

  const [imageInfos, setImageInfos] = useState<MediaInfo[]>([]);
  const [videoInfo, setVideoInfo] = useState<MediaInfo | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickAndUploadImages = createImagePicker(
    (uploaded) => {
      const currentLength = imageInfos.length;
      const newTotal = currentLength + uploaded.length;

      if (newTotal > maxImages) {
        // TODO: 토스트 도입 시 수정필요
        alert(SYSTEM_MESSAGES.MEDIA_UPLOAD.IMAGE_LIMIT_EXCEEDED(maxImages, currentLength));
        return;
      }

      setImageInfos((prev) => [...prev, ...uploaded]);
    },
    setIsUploading,
    (error) => alert(error),
  );

  const pickAndUploadVideo = enableVideo
    ? createVideoPicker(
        (uploaded) => setVideoInfo(uploaded),
        setIsUploading,
        (error) => alert(error),
      )
    : undefined;

  // 이미지 제거 헬퍼 함수
  const removeImage = (index: number) => {
    setImageInfos((prev) => prev.filter((_, i) => i !== index));
  };

  // 미리보기 URL 배열 (presignedUrl 사용)
  const imagePreviews = imageInfos.map((info) => info.presignedUrl);

  return {
    imageInfos,
    setImageInfos,
    imagePreviews,
    videoInfo,
    setVideoInfo,
    isUploading,
    pickAndUploadImages,
    pickAndUploadVideo,
    removeImage,
  };
}

export default useMediaUpload;
