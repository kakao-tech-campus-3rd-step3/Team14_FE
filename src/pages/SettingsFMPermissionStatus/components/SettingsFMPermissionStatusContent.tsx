import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyFMPermission } from '@/apis/festivalManager/getMyFMPermission';
import { deleteFMPermission } from '@/apis/festivalManager/deleteFMPermission';
import Button from '@/components/common/Button';
import useNav from '@/hooks/useNav';
import { ROUTE_PATH } from '@/constants/routes';
import axios from 'axios';
import EmptyComponent from '@/components/common/EmptyComponent';
import ErrorComponent from '@/components/common/ErrorComponent';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import SettingsFMPermissionStatusCard from '@/pages/SettingsFMPermissionStatus/components/SettingsFMPermissionStatusCard';
import SettingsFMPermissionInfoCard from '@/pages/SettingsFMPermissionStatus/components/SettingsFMPermissionInfoCard';
import SettingsFMPermissionDocumentCard from '@/pages/SettingsFMPermissionStatus/components/SettingsFMPermissionDocumentCard';
import SettingsFMPermissionButton from '@/pages/SettingsFMPermissionStatus/components/SettingsFMPermissionButton';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
/**
 * 축제 관리자 신청 상태 내용
 * @returns 축제 관리자 신청 상태 내용 컴포넌트
 * 축제 관리자 신청 상태를 표시합니다.
 */
const SettingsFMPermissionStatusContent = () => {
  const { goTo, goBack } = useNav();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['fmPermission'],
    queryFn: getMyFMPermission,
    retry: false,
  });

  const { mutate: deleteApplication, isPending: isDeleting } = useMutation({
    mutationFn: deleteFMPermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fmPermission'] });
      alert(SYSTEM_MESSAGES.FM_APPLICATION.DELETE_SUCCESS);
      goBack();
    },
    onError: () => {
      alert(SYSTEM_MESSAGES.FM_APPLICATION.DELETE_ERROR);
    },
  });

  const handleDelete = () => {
    if (confirm(SYSTEM_MESSAGES.FM_APPLICATION.DELETE_CONFIRM)) {
      deleteApplication();
    }
  };

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

  // TODO: 에러 처리 수정
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

  return (
    <div className="p-4 space-y-4">
      <SettingsFMPermissionStatusCard permission={permission} />

      <SettingsFMPermissionInfoCard permission={permission} />

      <SettingsFMPermissionDocumentCard permission={permission} />

      <SettingsFMPermissionButton
        permission={permission}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default SettingsFMPermissionStatusContent;
