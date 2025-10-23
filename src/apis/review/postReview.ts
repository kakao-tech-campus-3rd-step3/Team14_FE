import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { MediaInfo } from '@/types/Media/MediaInfo';

export interface PostReviewBody {
  content: string;
  score: number;
  imageInfos: MediaInfo[];
  videoInfo?: MediaInfo;
}

export async function postReview(params: { festivalId: string; body: PostReviewBody }) {
  const { festivalId, body } = params;
  const url = API_ENDPOINTS.FESTIVAL_REVIEWS.replace(':festivalId', festivalId);
  const res = await apiInstance.post(url, body);
  return {
    location: res.headers?.location ?? res.headers?.Location ?? '',
    status: res.status,
    data: res.data,
  };
}
