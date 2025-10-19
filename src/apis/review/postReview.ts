import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ImageInfo, VideoInfo } from '@/types/Media/MediaInfo';

export interface PostReviewBody {
  content: string;
  score: number;
  imageInfos: ImageInfo[];
  videoInfo?: VideoInfo;
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
