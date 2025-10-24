import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { MessageResponse } from '@/hooks/useChatRoom';
import type { ApiErrorResponse } from '@/apis/apiInstance';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

export interface GetChatRoomMessageResponse {
  content: MessageResponse[];
  hasMoreList: boolean;
  cursor: number;
}

export const getChatRoomMessage = async (params: {
  chatRoomId: string;
  cursor?: number;
  size: number;
}): Promise<AxiosResponse<GetChatRoomMessageResponse, ApiErrorResponse>> => {
  if (params.cursor === 0) {
    params.cursor = undefined;
  }
  return await apiInstance.get<GetChatRoomMessageResponse>(
    generatePath(API_ENDPOINTS.FESTIVAL_CHAT_ROOM_MESSAGES, { chatRoomId: params.chatRoomId }),
    { params: { cursor: params.cursor, size: params.size } },
  );
};

export default getChatRoomMessage;
