import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { Festival } from '@/types/FestivalType';
import type { ApiResponseList } from '@/apis/apiResponse';
import type { ApiErrorResponse } from '@/apis/apiInstance';
import type { AxiosResponse } from 'axios';
import type { PickStyleId } from '@/constants/pickStyles';

export interface PostFestivalsPickBody {
  areaCode: number;
  styles: PickStyleId[];
  isNewPlace: boolean;
  isSolo: boolean;
  prefersEnjoyment: boolean;
  isSpontaneous: boolean;
  additionalInfo: string;
}

export const postFestivalsPick = async (params: {
  requestData: PostFestivalsPickBody;
}): Promise<AxiosResponse<ApiResponseList<Festival>, ApiErrorResponse>> => {
  return await apiInstance.post<ApiResponseList<Festival>>(
    API_ENDPOINTS.FESTIVAL_PICK,
    params.requestData,
  );
};

export default postFestivalsPick;