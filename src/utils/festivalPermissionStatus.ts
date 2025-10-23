import type { ApplicationState } from '@/types/FMPermissionsRequest';
import { PICK_ICONS } from '@/constants/pickIcons';

export const FESTIVAL_PERMISSION_STATUS_LIST = [
  {
    state: 'PENDING' as const,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    badgeColor: 'bg-yellow-500',
    icon: PICK_ICONS.TIME,
    label: '심사 중',
    message: '신청서가 검토 중입니다.',
    detailedMessage: '신청서가 검토 중입니다. 영업일 기준 3~5일이 소요됩니다.',
  },
  {
    state: 'ACCEPTED' as const,
    color: 'bg-green-100 text-green-800 border-green-300',
    badgeColor: 'bg-green-500',
    icon: PICK_ICONS.CHECK,
    label: '승인됨',
    message: '축제 관리자로 승인되었습니다!',
    detailedMessage: '축제 관리자로 승인되었습니다!',
  },
  {
    state: 'DENIED' as const,
    color: 'bg-red-100 text-red-800 border-red-300',
    badgeColor: 'bg-red-500',
    icon: PICK_ICONS.NONE,
    label: '거절됨',
    message: '신청이 거절되었습니다.',
    detailedMessage: '신청이 거절되었습니다. 다시 신청하실 수 있습니다.',
  },
] as const;

// 축제 관련 신청 상태 기본값
const DEFAULT_STATUS_INFO = {
  color: 'bg-gray-100 text-gray-800 border-gray-300',
  badgeColor: 'bg-gray-500',
  icon: PICK_ICONS.DOCUMENT,
  label: '알 수 없음',
  message: '',
  detailedMessage: '',
} as const;

// 축제 관련 신청 상태 조회 함수
export const getFestivalPermissionStatusInfo = (state: ApplicationState) => {
  return (
    FESTIVAL_PERMISSION_STATUS_LIST.find((status) => status.state === state) || DEFAULT_STATUS_INFO
  );
};
