import { useEffect, useState } from 'react';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import type { MediaInfo } from '@/types/Media/MediaInfo';
import type { FestivalFormData } from '@/types/FestivalFormTypes';

/**
 * 축제 등록,수정 폼 초기 데이터
 * @param form - 축제 정보
 * @param posterUrl - 포스터 URL
 * @param imageUrls - 이미지 URL
 */
export interface UseFestivalFormInitialData {
  form?: Partial<FestivalFormData>;
  posterUrl?: string | null;
  imageUrls?: string[];
}

export interface UseFestivalFormReturn {
  formData: FestivalFormData;
  setFormData: React.Dispatch<React.SetStateAction<FestivalFormData>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  posterInfo: MediaInfo | null;
  setPosterInfo: React.Dispatch<React.SetStateAction<MediaInfo | null>>;
  imageInfos: MediaInfo[];
  pickAndUploadImages: () => void;
  removeImage: (index: number) => void;
  isUploadingImages: boolean;
}

const defaultForm: FestivalFormData = {
  title: '',
  areaCode: '0',
  addr1: '',
  addr2: '',
  startDate: '',
  endDate: '',
  homePage: '',
  overView: '',
};

export function useFestivalForm(initial?: UseFestivalFormInitialData): UseFestivalFormReturn {
  const [formData, setFormData] = useState<FestivalFormData>({
    ...defaultForm,
    ...(initial?.form ?? {}),
  });

  const [posterInfo, setPosterInfo] = useState<MediaInfo | null>(
    initial?.posterUrl ? { id: 0, presignedUrl: initial.posterUrl } : null,
  );

  const {
    imageInfos,
    setImageInfos,
    pickAndUploadImages,
    removeImage,
    isUploading: isUploadingImages,
  } = useMediaUpload({ maxImages: 10, enableVideo: false });

  useEffect(() => {
    if (initial?.imageUrls && initial.imageUrls.length > 0) {
      setImageInfos(initial.imageUrls.map((url) => ({ id: 0, presignedUrl: url })));
    }
  }, [initial?.imageUrls, setImageInfos]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    posterInfo,
    setPosterInfo,
    imageInfos,
    pickAndUploadImages,
    removeImage,
    isUploadingImages,
  };
}

export default useFestivalForm;
