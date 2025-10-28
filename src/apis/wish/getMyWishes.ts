import { apiInstance, type ApiErrorResponse } from '@/apis/apiInstance';
import type { ApiResponseList } from '@/apis/apiResponse';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';

export interface MyWish {
  id: number;
  managerId: number;
  title: string;
  addr1: string;
  addr2: string;
  posterInfo: string;
  startDate: string;
  endDate: string;
  averageScore: number;
  wishCount: number;
}

export const getMyWishes = async (
  page = 0,
  size = 5,
): Promise<AxiosResponse<ApiResponseList<MyWish>, ApiErrorResponse>> => {
  return await apiInstance.get(API_ENDPOINTS.MY_WISHES_FESTIVAL, {
    params: { page, size },
  });
};
