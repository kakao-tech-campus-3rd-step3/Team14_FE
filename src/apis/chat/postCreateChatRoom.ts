import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ApiResponseItem } from '@/apis/apiResponse';
import type { ApiErrorResponse } from '@/apis/apiResponse';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

export interface CreateChatRoomResponse {
  roomId: number;
  roomName: string;
  festivalId: number;
}

export const postCreateChatRoom = async (params: {
  festivalId: string;
}): Promise<AxiosResponse<ApiResponseItem<CreateChatRoomResponse>, ApiErrorResponse>> => {
  return await apiInstance.post<ApiResponseItem<CreateChatRoomResponse>>(
    generatePath(API_ENDPOINTS.FESTIVAL_CHAT_ROOMS, { festivalId: params.festivalId }),
  );
};

export default postCreateChatRoom;
