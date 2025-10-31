import useNav from '@/hooks/useNav';
import { generatePath } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';
import type { FestivalRegistrationApplication } from '@/types/FestivalFormTypes';
import { getFestivalPermissionStatusInfo } from '@/utils/festivalPermissionStatus';
import PickIcon from '@/components/common/PickIcon';

interface SettingsFestivalMyRegisteredApplicationCardProps {
  application: FestivalRegistrationApplication;
}

const SettingsFestivalMyRegisteredApplicationCard = ({
  application,
}: SettingsFestivalMyRegisteredApplicationCardProps) => {
  const { goTo } = useNav();
  const statusInfo = getFestivalPermissionStatusInfo(application.state);

  const handleClick = () => {
    goTo(generatePath(ROUTE_PATH.FESTIVAL_INFO, {
      festivalId: application.id.toString(),
    }));
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg text-gray-900">{application.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
              <PickIcon name={statusInfo.icon} size={16} className="mr-1" />
              {statusInfo.label}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            최종 수정일: {new Date(application.updatedDate).toLocaleDateString('ko-KR')}
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

export default SettingsFestivalMyRegisteredApplicationCard;