import { useState } from 'react';
import { createImagePicker, createVideoPicker } from '@/utils/filePicker';
import type { ImageInfo, VideoInfo } from '@/types/Media/MediaInfo';

export function useMediaUpload() {
  const [imageInfos, setImageInfos] = useState<ImageInfo[]>([]);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickAndUploadImages = createImagePicker(
    (uploaded) => {
      const currentLength = imageInfos.length; // 현재 개수
      const newTotal = currentLength + uploaded.length;
      // 이미지를 최대 10장까지만 업로드할 수 있도록 제한을 걸었습니다.
      if (newTotal > 10) {
        // TODO: 토스트 도입 시 수정필요
        alert(`이미지는 최대 10개까지만 업로드할 수 있습니다. (현재: ${currentLength}개)`);
        return;
      }

      setImageInfos((prev) => [...prev, ...uploaded]);
    },
    setIsUploading,
    (error) => alert(error),
  );

  const pickAndUploadVideo = createVideoPicker(
    (uploaded) => setVideoInfo(uploaded),
    setIsUploading,
    (error) => alert(error),
  );

  return {
    imageInfos,
    setImageInfos,
    videoInfo,
    setVideoInfo,
    isUploading,
    pickAndUploadImages,
    pickAndUploadVideo,
  };
}

export default useMediaUpload;
