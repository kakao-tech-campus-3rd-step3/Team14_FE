import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { MediaInfo } from '@/types/Media/MediaInfo';

export const patchProfileImage = async (body: MediaInfo) => {
  return await apiInstance.patch(API_ENDPOINTS.USER_PROFILE_IMAGE, body);
};
