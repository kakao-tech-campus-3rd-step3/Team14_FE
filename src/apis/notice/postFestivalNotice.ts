
import { apiInstance } from '@/apis/apiInstance';
import type { NoticeCreateRequest } from '@/types/Notice';
import { generatePath } from 'react-router-dom';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';

/**
 * 축제 공지사항 생성을 위한 API 함수입니다.
 * @param festivalId 축제 ID
 * @param title 공지사항 제목
 * @param content 공지사항 내용
 * @param images 공지사항 이미지
 */
export const postFestivalNotice = async (
  festivalId: string,
  noticeData: NoticeCreateRequest
): Promise<AxiosResponse<void>> => {
  return await apiInstance.post<void>(
    generatePath(API_ENDPOINTS.FESTIVAL_NOTICE, { festivalId }),
    noticeData
  );
};