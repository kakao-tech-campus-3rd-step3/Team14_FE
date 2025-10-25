import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';
import type { ApiResponseList } from '@/apis/apiResponse';
import { generatePath } from 'react-router-dom';

export interface FestivalNoticeItem {
  id: number;
  userId: number;
  updatedDate: string;
  title: string;
  content: string;
  images: string[];
}
/**
 * 축제를 기준으로 공지사항 목록을 조회하는 API 함수입니다.
 * @param festivalId 축제 ID
 * @param page 페이지 번호
 * @param size 페이지 크기
 * @returns 축제 공지사항 목록
 */
export const getFestivalNotices = async (
  festivalId: string,
  page: number = 0,
  size: number = 5,
): Promise<AxiosResponse<ApiResponseList<FestivalNoticeItem>>> => {
  return await apiInstance.get<ApiResponseList<FestivalNoticeItem>>(
    generatePath(API_ENDPOINTS.FESTIVAL_NOTICE, { festivalId }),
    {
      params: { page, size },
    },
  );
};
