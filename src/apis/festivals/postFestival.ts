import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ApiErrorResponse } from '@/apis/apiInstance';
import type { AxiosResponse } from 'axios';

export interface PostFestivalRequest {
  title: string;
  areaCode: number;
  addr1: string;
  addr2: string;
  posterInfo: {
    id: number;
    presignedUrl: string;
  };
  imageInfos: Array<{
    id: number;
    presignedUrl: string;
  }>;
  startDate: string;
  endDate: string;
  homePage: string;
  overView: string;
}

export const postFestival = async (
  festivalData: PostFestivalRequest,
): Promise<AxiosResponse<void, ApiErrorResponse>> => {
  return await apiInstance.post(API_ENDPOINTS.FESTIVAL_REGISTER, festivalData);
};

export default postFestival;
