import { apiInstance } from '@/apis/apiInstance';
import type { ApiResponseList, ApiErrorResponse } from '@/apis/apiResponse';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { Festival } from '@/types/FestivalType';
import type { AxiosResponse } from 'axios';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination';

export const getMyWishFestivals = async (
  page = DEFAULT_PAGE,
  size = DEFAULT_SIZE,
): Promise<AxiosResponse<ApiResponseList<Festival>, ApiErrorResponse>> => {
  return await apiInstance.get<ApiResponseList<Festival>>(API_ENDPOINTS.MY_WISHES_FESTIVAL, {
    params: { page, size },
  });
};
