import { apiInstance } from '@/apis/apiInstance';
import type { ApiResponseList, ApiErrorResponse } from '@/apis/apiResponse';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination';
import type { Festival } from '@/types/FestivalType';
import type { AxiosResponse } from 'axios';

export const getMyReviewFestivals = async (
  page = DEFAULT_PAGE,
  size = DEFAULT_SIZE,
): Promise<AxiosResponse<ApiResponseList<Festival>, ApiErrorResponse>> => {
  return await apiInstance.get<ApiResponseList<Festival>>(API_ENDPOINTS.MY_REVIEWS_FESTIVAL, {
    params: { page, size },
  });
};
