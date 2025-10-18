import Button from '@/components/common/Button';
import type { FMPermissionResponse } from '@/apis/festivalManager/getMyFMPermission';

interface SettingsFMPermissionButtonProps {
  permission: FMPermissionResponse['content'];
  goBack: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
  isDeleting: boolean;
}
const SettingsFMPermissionButton = ({
  permission,
  goBack,
  handleEdit,
  handleDelete,
  isDeleting,
}: SettingsFMPermissionButtonProps) => {
  return (
    <div className="flex gap-3 p-4 shadow-sm rounded-lg">
      <Button variant="secondary" className="flex-1" onClick={goBack}>
        돌아가기
      </Button>

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
        <Button
          variant="secondary"
          className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? '삭제 중...' : '삭제'}
        </Button>
      )}
    </div>
  );
};
export default SettingsFMPermissionButton;
