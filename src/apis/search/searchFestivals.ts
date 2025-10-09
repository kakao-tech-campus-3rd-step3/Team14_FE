import { apiInstance, type ApiErrorResponse } from '@/apis/apiInstance';
import type { ApiResponseList } from '@/apis/apiResponse';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { Festival } from '@/types/FestivalType';
import type { AxiosResponse } from 'node_modules/axios/index.d.cts';
import { generatePath } from 'react-router-dom';

export interface SearchParams {
  keyword: string;
  page?: number;
  size?: number;
}

export const searchFestivals = async (params:
     SearchParams
    ): Promise<AxiosResponse<ApiResponseList<Festival>, ApiErrorResponse>> => {
  return await apiInstance.get<ApiResponseList<Festival>>(
    generatePath(API_ENDPOINTS.FESTIVAL_SEARCH, {
      keyword: params.keyword,
      page: params.page || 0,
      size: params.size || 5
    }),
  );
};
