import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';

export async function logout(): Promise<AxiosResponse<void>> {
  const res = await apiInstance.post<void>(API_ENDPOINTS.LOGOUT, null, { withCredentials: true });
  return res;
}

export default logout;
