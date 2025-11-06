import type { ApplicationState } from '@/types/FMPermissionsRequest';
import { getFestivalPermissionStatusInfo } from '@/utils/festivalPermissionStatus';
import PickIcon from '@/components/common/PickIcon';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';

interface FestivalPermissionStatusCardProps {
  state: ApplicationState;
}
/**
 * 축제 관리자 신청 상태 카드
 * @param state - 신청 상태
 * @returns 축제 관리자 신청 상태 카드 컴포넌트
 * 축제 관리자 신청 상태를 표시합니다.
 */
const FestivalPermissionStatusCard = ({ state }: FestivalPermissionStatusCardProps) => {
  const statusInfo = getFestivalPermissionStatusInfo(state);

  return (
    <div className={`rounded-lg p-4 border-2 ${statusInfo.color}`}>
      <div className="flex items-center gap-3 mb-2">
        <PickIcon name={statusInfo.icon} size={48} />
        <div>
          <h3 className="font-bold text-lg">{statusInfo.label}</h3>
          <p className="text-sm">{statusInfo.message}</p>
          {state === 'DENIED' && (
            <p className="text-sm">{SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.DENIED_REAPPLY}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FestivalPermissionStatusCard;
