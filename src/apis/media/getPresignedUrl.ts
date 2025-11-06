import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { MediaInfo } from '@/types/Media/MediaInfo';

export async function getPresignedUrl() {
  const { data } = await apiInstance.get(API_ENDPOINTS.PRESIGNED_URL);
  return data.content as MediaInfo;
}
