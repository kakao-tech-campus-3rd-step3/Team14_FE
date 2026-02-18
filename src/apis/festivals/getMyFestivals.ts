import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination';
import type { ApiResponseList } from '@/apis/apiResponse';
import type { Festival } from '@/types/FestivalType';

export const getMyFestivals = async (
  page = DEFAULT_PAGE,
  size = DEFAULT_SIZE,
): Promise<{ data: ApiResponseList<Festival> }> => {
  const data = await apiInstance.get(API_ENDPOINTS.MY_FESTIVALS, {
    params: { page, size },
  });
  return data;
};
