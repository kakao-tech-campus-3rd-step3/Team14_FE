import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { Festival } from '@/types/FestivalType';
import type { ApiErrorResponse } from '@/apis/apiInstance';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

export interface GetFestivalInfoResponse {
  content: Festival & {
    overView: string;
    homePage: string;
    imageInfos: string[];
  };
}

export const getFestivalInfo = async (params: {
  festivalId: string;
}): Promise<AxiosResponse<GetFestivalInfoResponse, ApiErrorResponse>> => {
  return await apiInstance.get<GetFestivalInfoResponse>(
    generatePath(API_ENDPOINTS.FESTIVAL_INFO, { festivalId: params.festivalId }),
  );
};

export default getFestivalInfo;
