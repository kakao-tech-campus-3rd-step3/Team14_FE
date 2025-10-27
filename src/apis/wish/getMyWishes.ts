import { apiInstance, type ApiErrorResponse } from '@/apis/apiInstance';
import type { ApiResponseList } from '@/apis/apiResponse';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';

export interface MyWish {
  wishId: number;
  festivalId: number;
  userId: number;
  title: string;
  areaCode: number;
}

export const getMyWishes = async (
  page = 0,
  size = 5,
): Promise<AxiosResponse<ApiResponseList<MyWish>, ApiErrorResponse>> => {
  return await apiInstance.get(API_ENDPOINTS.MY_WISHES, {
    params: { page, size },
  });
};
