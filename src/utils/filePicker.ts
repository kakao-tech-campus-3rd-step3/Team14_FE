import MAX_MEDIA_SIZE from '@/constants/maxMediaSize';
import { uploadImageFiles,uploadVideoFile } from '@/utils/s3Upload';

export interface FileUploadOptions<T> {
  accept: string;
  multiple?: boolean;
  onUpload: (result: T) => void;
  onError?: (error: string) => void;
  onUploadingChange?: (isUploading: boolean) => void;
}

export const createFilePicker = <T>(options: FileUploadOptions<T>) => {
  const { accept, multiple = false, onUpload, onError, onUploadingChange } = options;

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    try {
      onUploadingChange?.(true);

      if (multiple) {
        const fileArray = Array.from(files);

        const invalids = fileArray.filter(
          (f) => !f.type.startsWith('image/') || f.size > MAX_MEDIA_SIZE.IMAGE,
        );
        if (invalids.length) {
          onError?.(
            `이미지는 파일당 최대 10MB만 허용됩니다. 문제 파일: ${invalids
              .map((f) => f.name)
              .join(', ')}`,
          );
          onUploadingChange?.(false);
          return;
        }
        const uploaded = await uploadImageFiles(fileArray);
        onUpload(uploaded as T);
      } else {
        const file = files[0];
        if (file.size > MAX_MEDIA_SIZE.VIDEO) {
          onError?.(`동영상은 최대 250MB만 허용됩니다.`);
          onUploadingChange?.(false);
          return;
        }
        const uploaded = await uploadVideoFile(file);
        onUpload(uploaded as T);
      }
    } catch (error) {
      const errorMessage = multiple
        ? '이미지 업로드에 실패했습니다.'
        : '동영상 업로드에 실패했습니다.';
      onError?.(errorMessage);
      // eslint로 error를 throw하였습니다. 추후에 변경하시면 됩니다!
      throw error;
    } finally {
      onUploadingChange?.(false);
    }
  };

  const openFilePicker = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.multiple = multiple;

    input.onchange = () => {
      handleFileSelect(input.files);
      // input 정리
      input.value = '';
      input.remove();
    };

    input.click();
  };

  return openFilePicker;
};

// 이미지, 동영상 업로드
export const createImagePicker = (
  onUpload: (result: { id: number; presignedUrl: string }[]) => void,
  onUploadingChange?: (isUploading: boolean) => void,
  onError?: (error: string) => void,
) => {
  return createFilePicker({
    accept: 'image/*',
    multiple: true,
    onUpload,
    onError,
    onUploadingChange,
  });
};

export const createVideoPicker = (
  onUpload: (result: { id: number; presignedUrl: string }) => void,
  onUploadingChange?: (isUploading: boolean) => void,
  onError?: (error: string) => void,
) => {
  return createFilePicker({
    accept: 'video/*',
    multiple: false,
    onUpload,
    onError,
    onUploadingChange,
  });
};
