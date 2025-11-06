import type { FMPermissionStatusResponse } from '@/apis/festivalManager/getMyFMPermission';
import PickIcon from '@/components/common/PickIcon';
import { PICK_ICONS } from '@/constants/pickIcons';

interface SettingsFMPermissionDocumentCardProps {
  permission: FMPermissionStatusResponse['content'];
}
/**
 * 축제 관리자 신청 서류 카드
 * @param permission - 축제 관리자 신청 상태
 * @returns 축제 관리자 신청 서류 카드 컴포넌트
 * 축제 관리자 신청 서류를 표시합니다.
 */
const SettingsFMPermissionDocumentCard = ({
  permission,
}: SettingsFMPermissionDocumentCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold mb-3">제출한 증빙 서류</h3>
      <div className="space-y-2">
        {permission.docsUrls.map((url, index) => (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <PickIcon name={PICK_ICONS.CLIP} size={24} />
              <span className="text-sm text-gray-700">서류 {index + 1}</span>
            </div>
            <span className="text-sm text-blue-600">보기 →</span>
          </a>
        ))}
      </div>
    </div>
  );
};
export default SettingsFMPermissionDocumentCard;
