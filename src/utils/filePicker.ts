import MAX_MEDIA_SIZE from '@/constants/maxMediaSize';
import { uploadDocumentFiles, uploadImageFiles, uploadVideoFile } from '@/utils/s3Upload';

export interface FileUploadOptions<T> {
  accept: string;
  multiple?: boolean;
  maxSize?: number;
  uploadFunction: (files: File[]) => Promise<T>;
  onUpload: (result: T) => void;
  onError?: (error: string) => void;
  onUploadingChange?: (isUploading: boolean) => void;
}

export const createFilePicker = <T>(options: FileUploadOptions<T>) => {
  const {
    accept,
    multiple = false,
    maxSize,
    uploadFunction,
    onUpload,
    onError,
    onUploadingChange,
  } = options;

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    try {
      onUploadingChange?.(true);
      const fileArray = Array.from(files);

      if (maxSize) {
        const oversizedFiles = fileArray.filter((f) => f.size > maxSize);
        if (oversizedFiles.length) {
          onError?.(
            `파일 크기는 ${maxSize / 1024 / 1024}MB를 초과할 수 없습니다.\n문제 파일: ${oversizedFiles.map((f) => f.name).join(', ')}`,
          );
          onUploadingChange?.(false);
          return;
        }
      }

      const uploaded = await uploadFunction(multiple ? fileArray : [fileArray[0]]);
      onUpload(uploaded);
    } catch (error) {
      onError?.('파일 업로드에 실패했습니다.');
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
      input.value = '';
      input.remove();
    };

    input.click();
  };

  return openFilePicker;
};

export const createImagePicker = (
  onUpload: (result: { id: number; presignedUrl: string }[]) => void,
  onUploadingChange?: (isUploading: boolean) => void,
  onError?: (error: string) => void,
) => {
  return createFilePicker({
    accept: 'image/*',
    multiple: true,
    maxSize: MAX_MEDIA_SIZE.IMAGE,
    uploadFunction: uploadImageFiles,
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
    maxSize: MAX_MEDIA_SIZE.VIDEO,
    uploadFunction: async (files) => uploadVideoFile(files[0]),
    onUpload,
    onError,
    onUploadingChange,
  });
};

export const createDocumentPicker = (
  onUpload: (result: { id: number; presignedUrl: string; fileName: string }[]) => void,
  onUploadingChange?: (isUploading: boolean) => void,
  onError?: (error: string) => void,
) => {
  return createFilePicker({
    accept: '.pdf,.doc,.docx,.hwp,image/*',
    multiple: true,
    maxSize: MAX_MEDIA_SIZE.DOCUMENT,
    uploadFunction: uploadDocumentFiles,
    onUpload,
    onError,
    onUploadingChange,
  });
};
