import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ApiResponseList } from '@/apis/apiResponse';
import type { Festival } from '@/types/FestivalType';
import type { ApiErrorResponse } from '@/apis/apiInstance';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

export const getFestivals = async (params: {
  areaId: string;
}): Promise<AxiosResponse<ApiResponseList<Festival>, ApiErrorResponse>> => {
  return await apiInstance.get<ApiResponseList<Festival>>(
    generatePath(API_ENDPOINTS.FESTIVALS, { areaId: params.areaId }),
  );
};

export default getFestivals;
