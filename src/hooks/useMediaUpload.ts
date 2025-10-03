import { useState } from 'react';
import { createImagePicker, createVideoPicker } from '@/utils/fileUpload';

export function useMediaUpload() {
  const [imageInfos, setImageInfos] = useState<{ id: number; presignedUrl: string }[]>([]);
  const [videoInfo, setVideoInfo] = useState<{ id: number; presignedUrl: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickAndUploadImages = createImagePicker(
    (uploaded) => setImageInfos((prev) => [...prev, ...uploaded]),
    setIsUploading,
    (error) => alert(error)
  );

  const pickAndUploadVideo = createVideoPicker(
    (uploaded) => setVideoInfo(uploaded),
    setIsUploading,
    (error) => alert(error)
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
