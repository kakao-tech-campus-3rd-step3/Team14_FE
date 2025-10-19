import type { ApplicationState } from '@/apis/apiResponse';

export const getFestivalPermissionStatusInfo = (state: ApplicationState) => {
  switch (state) {
    case 'PENDING':
      return {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        badgeColor: 'bg-yellow-500',
        icon: '⏳',
        label: '심사 중',
        message: '신청서가 검토 중입니다.',
      };
    case 'ACCEPTED':
      return {
        color: 'bg-green-100 text-green-800 border-green-300',
        badgeColor: 'bg-green-500',
        icon: '✅',
        label: '승인됨',
        message: '축제 관리자로 승인되었습니다!',
      };
    case 'DENIED':
      return {
        color: 'bg-red-100 text-red-800 border-red-300',
        badgeColor: 'bg-red-500',
        icon: '❌',
        label: '거절됨',
        message: '신청이 거절되었습니다.',
      };
  }
};
