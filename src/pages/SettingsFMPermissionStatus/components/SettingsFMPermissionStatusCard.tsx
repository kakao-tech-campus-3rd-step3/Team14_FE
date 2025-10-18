import type { FMPermissionResponse } from '@/apis/festivalManager/getMyFMPermission';

interface SettingsFMPermissionStatusCardProps {
  permission: FMPermissionResponse['content'];
}
/**
 * 축제 관리자 신청 상태 카드
 * @param permission - 축제 관리자 신청 상태
 * @returns 축제 관리자 신청 상태 카드
 */
const getStatusInfo = (state: string) => {
  switch (state) {
    case 'PENDING':
      return {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        icon: '⏳',
        label: '심사 중',
        message: '신청서가 검토 중입니다. 영업일 기준 3~5일이 소요됩니다.',
      };
    case 'ACCEPTED':
      return {
        color: 'bg-green-100 text-green-800 border-green-300',
        icon: '✅',
        label: '승인됨',
        message: '축제 관리자로 승인되었습니다!',
      };
    case 'DENIED':
      return {
        color: 'bg-red-100 text-red-800 border-red-300',
        icon: '❌',
        label: '거절됨',
        message: '신청이 거절되었습니다. 다시 신청하실 수 있습니다.',
      };
    default:
      return {
        color: 'bg-gray-100 text-gray-800 border-gray-300',
        icon: '📄',
        label: '알 수 없음',
        message: '',
      };
  }
};
const SettingsFMPermissionStatusCard = ({ permission }: SettingsFMPermissionStatusCardProps) => {
  const statusInfo = getStatusInfo(permission.state);

  return (
    <div className={`rounded-lg p-4 border-2 ${statusInfo.color}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{statusInfo.icon}</span>
        <div>
          <h3 className="font-bold text-lg">{statusInfo.label}</h3>
          <p className="text-sm">{statusInfo.message}</p>
        </div>
      </div>
    </div>
  );
};
export default SettingsFMPermissionStatusCard;
