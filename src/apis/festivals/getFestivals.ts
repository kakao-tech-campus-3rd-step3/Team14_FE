import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ApiResponseList } from '@/apis/apiResponse';
import type { Festival } from '@/types/FestivalType';
import type { ApiErrorResponse } from '@/apis/apiInstance';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

const DEFAULT_SIZE = 6;
const DEFAULT_PAGE = 0;
const DEFAULT_CURRENT = true;

export const getFestivals = async ({
  areaId,
  size = DEFAULT_SIZE,
  page = DEFAULT_PAGE,
  current = DEFAULT_CURRENT,
}: {
  areaId: string;
  size?: number;
  page?: number;
  current?: boolean;
}): Promise<AxiosResponse<ApiResponseList<Festival>, ApiErrorResponse>> => {
  return await apiInstance.get<ApiResponseList<Festival>>(
    generatePath(API_ENDPOINTS.FESTIVALS, { areaId }),
    { params: { size, page, current } },
  );
};

export default getFestivals;
