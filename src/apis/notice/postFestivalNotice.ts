
import { apiInstance } from '@/apis/apiInstance';
import type { NoticeCreateRequest } from '@/types/Notice';
import { generatePath } from 'react-router-dom';
import API_ENDPOINTS from '@/constants/apiEndpoints';

export const postFestivalNotice = async (
  festivalId: string,
  noticeData: NoticeCreateRequest
) => {
  return await apiInstance.post(
    generatePath(API_ENDPOINTS.FESTIVAL_NOTICE, { festivalId }),
    noticeData
  );
};