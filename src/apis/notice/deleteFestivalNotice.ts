import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';
import type { AxiosResponse } from 'axios';
/**
 * 공지사항 삭제를 위한 API 함수입니다.
 * @param id 공지사항 ID
 */
export const deleteFestivalNotice = async (id: string): Promise<AxiosResponse<void>> => {
  return await apiInstance.delete<void>(generatePath(API_ENDPOINTS.FESTIVAL_NOTICE_DETAIL, { id }));
};
