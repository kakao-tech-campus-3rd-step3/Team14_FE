import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { MessageResponse } from '@/hooks/useChatRoom';
import type { ApiResponseList } from '@/apis/apiResponse';
import type { ApiErrorResponse } from '@/apis/apiInstance';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

export const getChatRoomMessage = async (params: {
  chatRoomId: string;
}): Promise<AxiosResponse<ApiResponseList<MessageResponse>, ApiErrorResponse>> => {
  return await apiInstance.get<ApiResponseList<MessageResponse>>(
    generatePath(API_ENDPOINTS.FESTIVAL_CHAT_ROOM_MESSAGES, { chatRoomId: params.chatRoomId }),
  );
};

export default getChatRoomMessage;
