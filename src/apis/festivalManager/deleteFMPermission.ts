import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';

export async function deleteFMPermission() {
  return await apiInstance.delete(generatePath(API_ENDPOINTS.FM_PERMISSION_MY));
}