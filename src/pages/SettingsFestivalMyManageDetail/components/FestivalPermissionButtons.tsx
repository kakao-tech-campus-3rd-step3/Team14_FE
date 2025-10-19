import Button from '@/components/common/Button';
import type { ApplicationState } from '@/apis/apiResponse';

interface FestivalPermissionButtonsProps {
  state: ApplicationState;
  goBack: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
  isDeleting: boolean;
}

const FestivalPermissionButtons = ({
  state,
  goBack,
  handleEdit,
  handleDelete,
  isDeleting,
}: FestivalPermissionButtonsProps) => {
  return (
    <div className="flex gap-3 p-4 shadow-sm rounded-lg">
      <Button variant="secondary" className="flex-1" onClick={goBack}>
        돌아가기
      </Button>

      {/* PENDING 상태: 수정/삭제 가능 */}
      {state === 'PENDING' && (
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

      {/* DENIED 상태: 삭제만 가능 */}
      {state === 'DENIED' && (
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

export default FestivalPermissionButtons;