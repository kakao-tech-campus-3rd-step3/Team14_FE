import type { ApplicationState } from '@/apis/apiResponse';
import { getFestivalPermissionStatusInfo } from '@/utils/festivalPermissionStatus';

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
        <span className="text-3xl">{statusInfo.icon}</span>
        <div>
          <h3 className="font-bold text-lg">{statusInfo.label}</h3>
          <p className="text-sm">{statusInfo.message}</p>
        </div>
      </div>
    </div>
  );
};

export default FestivalPermissionStatusCard;
