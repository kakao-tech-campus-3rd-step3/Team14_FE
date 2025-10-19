import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';

interface FestivalManagerApplyRequest {
  documents: Array<{
    id: number;
    presignedUrl: string;
  }>;
}

export async function postFestivalManagerApply(
  festivalId: string,
  body: FestivalManagerApplyRequest
) {
  return await apiInstance.post(API_ENDPOINTS.FESTIVAL_MANAGER_APPLY, { festivalId, body });
}
