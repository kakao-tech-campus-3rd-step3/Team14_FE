import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';

export interface UpdateProfileImageRequest {
  id: number;
  presignedUrl: string;
}

export const patchProfileImage = async (body: UpdateProfileImageRequest) => {
  return await apiInstance.patch(API_ENDPOINTS.USER_PROFILE_IMAGE, body);
};