import { useState } from 'react';
import { uploadImageFiles } from '@/utils/s3Upload';
import MAX_MEDIA_SIZE from '@/constants/maxMediaSize';
import type { ImageInfo } from '@/types/Media/MediaInfo';

export function useImageUploadWithPreview(maxCount: number = 10) {
  const [imageInfos, setImageInfos] = useState<ImageInfo[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    // 최대 개수 제한
    if (imageInfos.length + fileArray.length > maxCount) {
      alert(`이미지는 최대 ${maxCount}개까지 업로드 가능합니다. (현재: ${imageInfos.length}개)`);
      return;
    }

    // 파일 크기 체크
    const oversizedFiles = fileArray.filter((f) => f.size > MAX_MEDIA_SIZE.IMAGE);
    if (oversizedFiles.length > 0) {
      alert(
        `일부 파일의 크기가 ${MAX_MEDIA_SIZE.IMAGE / 1024 / 1024}MB를 초과합니다.\n문제 파일: ${oversizedFiles.map((f) => f.name).join(', ')}`
      );
      return;
    }

    try {
      setIsUploading(true);

      // 미리보기 생성
      const newPreviews: string[] = [];
      for (const file of fileArray) {
        const reader = new FileReader();
        await new Promise<void>((resolve) => {
          reader.onload = (e) => {
            newPreviews.push(e.target?.result as string);
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }
      setImagePreviews((prev) => [...prev, ...newPreviews]);

      // S3 업로드
      const uploaded = await uploadImageFiles(fileArray);
      setImageInfos((prev) => [...prev, ...uploaded]);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImageInfos((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    imageInfos,
    imagePreviews,
    isUploading,
    handleImagesUpload,
    removeImage,
  };
}
