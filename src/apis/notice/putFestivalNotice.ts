import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';
import type { AxiosResponse } from 'axios';
import type { MediaInfo } from '@/types/Media/MediaInfo';

export interface UpdateFestivalNoticeRequest {
  title: string;
  content: string;
  images: MediaInfo[];
}

export const putFestivalNotice = async (
  id: string,
  body: UpdateFestivalNoticeRequest,
): Promise<AxiosResponse<void>> => {
  return await apiInstance.put<void>(
    generatePath(API_ENDPOINTS.FESTIVAL_NOTICE_DETAIL, { id }),
    body,
  );
};
