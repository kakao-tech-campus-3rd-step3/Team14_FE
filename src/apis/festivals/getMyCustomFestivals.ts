import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ApiResponseList } from '@/apis/apiResponse';
import type { FestivalRegistrationApplication } from '@/types/FestivalFormTypes';

const PAGE_SIZE = 5;
const DEFAULT_PAGE = 0;

export const getMyCustomFestivals = async (
  page = DEFAULT_PAGE,
  size = PAGE_SIZE,
): Promise<{ data: ApiResponseList<FestivalRegistrationApplication> }> => {
  const data = await apiInstance.get(API_ENDPOINTS.MY_CUSTOM_FESTIVALS, {
    params: { page, size },
  });
  return data;
};
