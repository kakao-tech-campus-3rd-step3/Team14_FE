import { useQuery } from '@tanstack/react-query';
import { getMyFMPermission } from '@/apis/festivalManager/getMyFMPermission';
import { deleteFMPermission } from '@/apis/festivalManager/deleteFMPermission';
import Button from '@/components/common/Button';
import useNav from '@/hooks/useNav';
import { ROUTE_PATH } from '@/constants/routes';
import axios from 'axios';
import EmptyComponent from '@/components/common/EmptyComponent';
import ErrorComponent from '@/components/error/ErrorComponent';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import SettingsFMPermissionStatusCard from '@/pages/SettingsFMPermissionStatus/components/SettingsFMPermissionStatusCard';
import SettingsFMPermissionInfoCard from '@/pages/SettingsFMPermissionStatus/components/SettingsFMPermissionInfoCard';
import SettingsFMPermissionDocumentCard from '@/pages/SettingsFMPermissionStatus/components/SettingsFMPermissionDocumentCard';
import SettingsFMPermissionButton from '@/pages/SettingsFMPermissionStatus/components/SettingsFMPermissionButton';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { useDeleteWithConfirm } from '@/hooks/useDeleteWithConfirm';

/**
 * 축제 관리자 신청 상태 내용
 * @returns 축제 관리자 신청 상태 내용 컴포넌트
 * 축제 관리자 신청 상태를 표시합니다.
 */
const SettingsFMPermissionStatusContent = () => {
  const { goTo } = useNav();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['fmPermission'],
    queryFn: getMyFMPermission,
    retry: false,
  });

  const { isConfirmOpen, isDeleting, handleDelete, handleConfirmDelete, setIsConfirmOpen } =
    useDeleteWithConfirm(
      async () => {
        await deleteFMPermission();
      },
      ['fmPermission'],
      SYSTEM_MESSAGES.FM_APPLICATION.DELETE_SUCCESS,
      SYSTEM_MESSAGES.FM_APPLICATION.DELETE_ERROR,
    );

  const handleEdit = () => {
    goTo(`${ROUTE_PATH.FM_PERMISSION_APPLICATION}?mode=edit`);
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-[400px]" message="신청서를 불러오는 중..." />;
  }

  // 404 에러 (신청서가 없음)
  if (isError && axios.isAxiosError(error) && error.response?.status === 404) {
    return (
      <div className="p-4">
        <EmptyComponent
          title="신청서가 없습니다"
          description="아직 축제 관리자 신청을 하지 않으셨습니다."
        />
        <div className="flex justify-center mt-4">
          <Button variant="primary" onClick={() => goTo(ROUTE_PATH.FM_PERMISSION_APPLICATION)}>
            신청서 작성하기
          </Button>
        </div>
      </div>
    );
  }

  // 기타 에러
  if (isError) {
    return (
      <ErrorComponent
        title="오류가 발생했습니다"
        message="신청서를 불러오는 중 문제가 발생했습니다."
        showBackButton={true}
      />
    );
  }

  const permission = data?.data.content;
  if (!permission) return null;
  const { message } = (() => {
    switch (permission.state) {
      case 'ACCEPTED':
        return { message: SYSTEM_MESSAGES.FM_APPLICATION.APPROVED_DELETE_CONFIRM };
      default:
        return { message: SYSTEM_MESSAGES.FM_APPLICATION.DELETE_CONFIRM };
    }
  })();
  return (
    <div className="p-4 space-y-4">
      <SettingsFMPermissionStatusCard permission={permission} />

      <SettingsFMPermissionInfoCard permission={permission} />

      <SettingsFMPermissionDocumentCard permission={permission} />

      <SettingsFMPermissionButton
        permission={permission}
        handleEdit={handleEdit}
        handleDelete={() => handleDelete(permission.id)}
        isDeleting={isDeleting}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="신청서 삭제"
        message={message}
        isDelete={true}
      />
    </div>
  );
};

export default SettingsFMPermissionStatusContent;
