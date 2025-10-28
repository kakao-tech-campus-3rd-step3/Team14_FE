import { apiInstance, type ApiErrorResponse } from '@/apis/apiInstance';
import type { ApiResponseList } from '@/apis/apiResponse';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { Festival } from '@/types/FestivalType';
import type { AxiosResponse } from 'axios';

export const getMyReviewFestivals = async (
  page = 0,
  size = 5,
): Promise<AxiosResponse<ApiResponseList<Festival>, ApiErrorResponse>> => {
  return await apiInstance.get<ApiResponseList<Festival>>(API_ENDPOINTS.MY_REVIEWS_FESTIVAL, {
    params: { page, size },
  });
};
