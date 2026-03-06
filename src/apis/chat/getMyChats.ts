import { apiInstance } from '@/apis/apiInstance';
import type { ApiResponseList, ApiErrorResponse } from '@/apis/apiResponse';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination';

export interface MyChat {
  roomId: number;
  roomName: string;
  festivalId: number;
  posterInfo: string;
  existNewMessage: boolean;
}

export const getMyChats = async (
  page = DEFAULT_PAGE,
  size = DEFAULT_SIZE,
): Promise<AxiosResponse<ApiResponseList<MyChat>, ApiErrorResponse>> => {
  return await apiInstance.get<ApiResponseList<MyChat>>(API_ENDPOINTS.MY_CHATS, {
    params: {
      page,
      size,
    },
  });
};
