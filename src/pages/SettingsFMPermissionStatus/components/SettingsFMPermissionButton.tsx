import Button from '@/components/common/Button';
import type { FMPermissionStatusResponse } from '@/apis/festivalManager/getMyFMPermission';
import useNav from '@/hooks/useNav';

interface SettingsFMPermissionButtonProps {
  permission: FMPermissionStatusResponse['content'];
  handleEdit: () => void;
  handleDelete: () => void;
  isDeleting: boolean;
}
/**
 * 축제 관리자 신청 버튼
 * @param permission - 축제 관리자 신청 상태
 * @param handleEdit - 수정 핸들러
 * @param handleDelete - 삭제 핸들러
 * @param isDeleting - 삭제 중 여부
 * @returns 축제 관리자 신청 버튼 컴포넌트
 * 축제 관리자 신청 버튼을 표시합니다.
 */
const SettingsFMPermissionButton = ({
  permission,
  handleEdit,
  handleDelete,
  isDeleting,
}: SettingsFMPermissionButtonProps) => {
  const { goBack } = useNav();
  return (
    <div className="flex gap-3 p-4 shadow-sm rounded-lg">
      <Button variant="secondary" className="flex-1" onClick={goBack}>
        돌아가기
      </Button>
      {permission.state === 'ACCEPTED' && (
        <Button
          variant="secondary"
          className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? '삭제 중...' : '삭제'}
        </Button>
      )}
      {permission.state === 'PENDING' && (
        <>
          <Button variant="secondary" className="flex-1" onClick={handleEdit}>
            수정
          </Button>
          <Button
            variant="secondary"
            className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? '삭제 중...' : '삭제'}
          </Button>
        </>
      )}
      {permission.state === 'DENIED' && (
        <>
                  <Button variant="secondary" className="flex-1" onClick={handleEdit}>
                  수정
                </Button>
        <Button
          variant="secondary"
          className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? '삭제 중...' : '삭제'}
        </Button>
        </>
      )}
    </div>
    
  );
};
export default SettingsFMPermissionButton;
