import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';

export async function deleteUser(): Promise<AxiosResponse<void>> {
  const res = await apiInstance.delete<void>(API_ENDPOINTS.DELETE_USER);
  return res;
}

export default deleteUser;

