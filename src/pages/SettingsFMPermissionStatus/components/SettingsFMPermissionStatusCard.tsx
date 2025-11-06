import type { FMPermissionStatusResponse } from '@/apis/festivalManager/getMyFMPermission';
import { getFestivalPermissionStatusInfo } from '@/utils/festivalPermissionStatus';
import PickIcon from '@/components/common/PickIcon';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';

interface SettingsFMPermissionStatusCardProps {
  permission: FMPermissionStatusResponse['content'];
}

const SettingsFMPermissionStatusCard = ({ permission }: SettingsFMPermissionStatusCardProps) => {
  const statusInfo = getFestivalPermissionStatusInfo(permission.state);

  return (
    <div className={`rounded-lg p-4 border-2 ${statusInfo.color}`}>
      <div className="flex items-center gap-3 mb-2">
        <PickIcon name={statusInfo.icon} size={48} />
        <div>
          <h3 className="font-bold text-lg">{statusInfo.label}</h3>
          <p className="text-sm">{statusInfo.message}</p>
          {permission.state === 'DENIED' && (
            <p className="text-sm">
              {SYSTEM_MESSAGES.FM_APPLICATION.DENIED_REAPPLY}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsFMPermissionStatusCard;
