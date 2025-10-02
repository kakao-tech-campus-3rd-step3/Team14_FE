import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ApiErrorResponse } from '@/apis/apiInstance';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

// 삭제 되면 204 NO CONTENT 반환
export const deleteWish = async (params: {
  wishId: string;
}): Promise<AxiosResponse<void, ApiErrorResponse>> => {
  return await apiInstance.delete<void>(
    generatePath(API_ENDPOINTS.FESTIVAL_WISH_DELETE, { wishId: params.wishId }),
  );
};

export default deleteWish;
