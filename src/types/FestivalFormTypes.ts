import type { MediaInfo } from '@/types/Media/MediaInfo';

export interface FestivalFormData {
  title: string;
  areaCode: string;
  addr1: string;
  addr2: string;
  startDate: string;
  endDate: string;
  homePage: string;
  overView: string;
}

export interface FestivalUpdateRequest extends FestivalFormData {
  posterInfo: MediaInfo;
  imageInfos: MediaInfo[];
}
export interface FestivalCardProps {
  formData: FestivalFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  isSubmitting: boolean;
}
