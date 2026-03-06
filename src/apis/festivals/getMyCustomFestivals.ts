import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination';
import type { ApiResponseList } from '@/apis/apiResponse';
import type { FestivalRegistrationApplication } from '@/types/FestivalFormTypes';

export const getMyCustomFestivals = async (
  page = DEFAULT_PAGE,
  size = DEFAULT_SIZE,
): Promise<{ data: ApiResponseList<FestivalRegistrationApplication> }> => {
  const data = await apiInstance.get(API_ENDPOINTS.MY_CUSTOM_FESTIVALS, {
    params: { page, size },
  });
  return data;
};
