import type { FMPermissionStatusResponse } from '@/apis/festivalManager/getMyFMPermission';

interface SettingsFMPermissionInfoCardProps {
  permission: FMPermissionStatusResponse['content'];
}

/**
 * 축제 관리자 신청 정보 카드
 * @param permission - 축제 관리자 신청 상태
 * @returns 축제 관리자 신청 정보 카드 컴포넌트
 * 축제 관리자 신청 정보를 표시합니다.
 */
const SettingsFMPermissionInfoCard = ({ permission }: SettingsFMPermissionInfoCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold mb-3">신청 정보</h3>

      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-600">소속</label>
          <p className="font-medium">{permission.department}</p>
        </div>

        <div>
          <label className="text-sm text-gray-600">신청 ID</label>
          <p className="font-medium text-gray-500">#{permission.id}</p>
        </div>

        <div>
          <label className="text-sm text-gray-600">최종 수정일</label>
          <p className="font-medium text-gray-500">
            {new Date(permission.updatedDate).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
export default SettingsFMPermissionInfoCard;
