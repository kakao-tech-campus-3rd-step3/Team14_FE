
import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

export const deleteFestival = async (festivalId: string): Promise<AxiosResponse<void>> => {
  return await apiInstance.delete<void>(generatePath(API_ENDPOINTS.FESTIVAL_INFO, { festivalId }));
};