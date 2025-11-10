import { apiInstance } from '@/apis/apiInstance';
import type { ApiErrorResponse } from '@/apis/apiResponse';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

export const deleteChatRoom = async (
  roomId: number,
): Promise<AxiosResponse<void, ApiErrorResponse>> => {
  return await apiInstance.delete<void>(
    generatePath(API_ENDPOINTS.LEAVE_CHAT_ROOM, { roomId: roomId.toString() }),
  );
};

export default deleteChatRoom;
