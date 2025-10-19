import type { ApplicationState } from '@/apis/apiResponse';
import { getFestivalPermissionStatusInfo } from '@/utils/festivalPermissionStatus';

interface FestivalPermissionStatusCardProps {
  state: ApplicationState;
}

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