import { useNavigate } from 'react-router-dom';
import type { FestivalPermissionItem } from '@/apis/festivalManager/getMyFestivalPermissions';
import { getFestivalPermissionStatusInfo } from '@/utils/festivalPermissionStatus';

interface FestivalPermissionCardProps {
  permission: FestivalPermissionItem;
}

const FestivalPermissionCard = ({ permission }: FestivalPermissionCardProps) => {
  const navigate = useNavigate();
  const statusInfo = getFestivalPermissionStatusInfo(permission.state);

  const handleClick = () => {
    navigate(`/settings/festival-my-manage/${permission.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg text-gray-900">{permission.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
              {statusInfo.icon} {statusInfo.label}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            신청일: {new Date(permission.appliedDate).toLocaleDateString()}
          </p>
        </div>
        <div className="text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FestivalPermissionCard;
