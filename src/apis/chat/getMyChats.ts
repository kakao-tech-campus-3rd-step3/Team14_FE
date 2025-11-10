import { apiInstance } from '@/apis/apiInstance';
import type { ApiResponseList, ApiErrorResponse } from '@/apis/apiResponse';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';

export interface MyChat {
  roomId: number;
  roomName: string;
  festivalId: number;
  posterInfo: string;
  existNewMessage: boolean;
}

export const getMyChats = async (
  page = 0,
  size = 5,
): Promise<AxiosResponse<ApiResponseList<MyChat>, ApiErrorResponse>> => {
  return await apiInstance.get<ApiResponseList<MyChat>>(API_ENDPOINTS.MY_CHATS, {
    params: {
      page,
      size,
    },
  });
};
