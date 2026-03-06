import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { FestivalInfo } from '@/types/FestivalType';
import type { ApiResponseItem, ApiErrorResponse } from '@/apis/apiResponse';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

export const getFestivalInfo = async (params: {
  festivalId: string;
}): Promise<AxiosResponse<ApiResponseItem<FestivalInfo>, ApiErrorResponse>> => {
  return await apiInstance.get<ApiResponseItem<FestivalInfo>>(
    generatePath(API_ENDPOINTS.FESTIVAL_INFO, { festivalId: params.festivalId }),
  );
};

export default getFestivalInfo;
