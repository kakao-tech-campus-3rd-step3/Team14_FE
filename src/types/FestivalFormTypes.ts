import type { MediaInfo } from '@/types/Media/MediaInfo';
import type { ApplicationState } from '@/types/FMPermissionsRequest';

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

export interface FestivalUpdateRequest extends Omit<FestivalFormData, 'areaCode'> {
  areaCode: number;
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

export interface FestivalRegistrationApplication {
  id: number;
  title: string;
  updatedDate: string;
  state: FestivalRegistrationApplicationState;
}
export type FestivalRegistrationApplicationState = ApplicationState;
