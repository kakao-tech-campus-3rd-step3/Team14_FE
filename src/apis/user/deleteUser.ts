import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';

export async function deleteUser(): Promise<AxiosResponse<void>> {
  return await apiInstance.delete<void>(API_ENDPOINTS.DELETE_USER);
}

export default deleteUser;
