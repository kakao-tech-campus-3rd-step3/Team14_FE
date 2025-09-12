import { apiInstance } from '@/apis/instance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { Festival } from '@/types/FestivalType';
import type { ApiErrorResponse } from '@/apis/instance';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

export interface GetFestivalsResponse {
  content: Festival[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
}

export const getFestivals = async (params: {
  areaId: string;
}): Promise<AxiosResponse<GetFestivalsResponse, ApiErrorResponse>> => {
  return await apiInstance.get<GetFestivalsResponse>(
    generatePath(API_ENDPOINTS.FESTIVALS, { areaId: params.areaId }) + '?size=10000',
  );
};

export default getFestivals;
