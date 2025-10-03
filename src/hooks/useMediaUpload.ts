import { useState } from 'react';
import { uploadImageFiles, uploadVideoFile } from '@/utils/getPresigned';

export function useMediaUpload() {
  const [imageInfos, setImageInfos] = useState<{ id: number; presignedUrl: string }[]>([]);
  const [videoInfo, setVideoInfo] = useState<{ id: number; presignedUrl: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickAndUploadImages = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = async () => {
      const files = Array.from(input.files || []);
      if (!files.length) return;
      try {
        setIsUploading(true);
        const uploaded = await uploadImageFiles(files);
        setImageInfos((prev) => [...prev, ...uploaded]);
      } catch (e) {
        alert('이미지 업로드에 실패했습니다.');
      } finally {
        setIsUploading(false);
      }
    };
    input.click();
  };

  const pickAndUploadVideo = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        setIsUploading(true);
        const uploaded = await uploadVideoFile(file);
        setVideoInfo(uploaded);
      } catch (e) {
        alert('동영상 업로드에 실패했습니다.');
      } finally {
        setIsUploading(false);
      }
    };
    input.click();
  };

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
