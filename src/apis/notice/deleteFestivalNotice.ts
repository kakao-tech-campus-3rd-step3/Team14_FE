import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';
import type { AxiosResponse } from 'axios';

export const deleteFestivalNotice = async (
  id: string,
): Promise<AxiosResponse<void>> => {
  return await apiInstance.delete<void>(
    generatePath(API_ENDPOINTS.FESTIVAL_NOTICE_DETAIL, { id }),
  );
};
