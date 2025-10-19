import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';

export interface FestivalManagerApplyRequest {
  documents: Array<{
    id: number;
    presignedUrl: string;
  }>;
}

export async function postFestivalManagerApply(
  festivalId: string,
  body: FestivalManagerApplyRequest,
) {
  return await apiInstance.post(
    generatePath(API_ENDPOINTS.FESTIVAL_MANAGER_APPLY, { festivalId }),
    body,
  );
}
