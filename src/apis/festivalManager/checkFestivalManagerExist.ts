/**
 * 해당 축제에 관리자가 존재하는 지 여부를 확인하는 api함수
 */
import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';

export interface CheckFestivalManagerExistResponse {
    content:boolean;
  }

export async function checkFestivalManagerExist(festivalId: string) {
  return await apiInstance.get<CheckFestivalManagerExistResponse>(generatePath(API_ENDPOINTS.FESTIVAL_MANAGER_EXIST, { festivalId }));
}

