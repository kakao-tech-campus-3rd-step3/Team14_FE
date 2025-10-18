import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyFMPermission } from '@/apis/festivalManager/getMyFMPermission';
import { deleteFMPermission } from '@/apis/festivalManager/deleteFMPermission';
import Button from '@/components/common/Button';
import useNav from '@/hooks/useNav';
import { ROUTE_PATH } from '@/constants/routes';
import axios from 'axios';
import EmptyComponent from '@/components/common/EmptyComponent';
import ErrorComponent from '@/components/common/ErrorComponent';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import SettingsFMPermissionStatusCard from '@/pages/SettingsFMPermissionStatus/components/SettingsFMPermissionStatusCard';
import SettingsFMPermissionInfoCard from '@/pages/SettingsFMPermissionStatus/components/SettingsFMPermissionInfoCard';
import SettingsFMPermissionDocumentCard from '@/pages/SettingsFMPermissionStatus/components/SettingsFMPermissionDocumentCard';
import SettingsFMPermissionButton from '@/pages/SettingsFMPermissionStatus/components/SettingsFMPermissionButton';

const SettingsFMPermissionStatusContent = () => {
  const { goTo, goBack } = useNav();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['fmPermission'],
    queryFn: getMyFMPermission,
    retry: false, // 404 시 재시도하지 않음
  });

  const { mutate: deleteApplication, isPending: isDeleting } = useMutation({
    mutationFn: deleteFMPermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fmPermission'] });
      alert('신청서가 삭제되었습니다.');
      goBack();
    },
    onError: () => {
      alert('신청서 삭제에 실패했습니다.');
    },
  });

  const handleDelete = () => {
    if (confirm('정말 신청서를 삭제하시겠습니까?')) {
      deleteApplication();
    }
  };

  const handleEdit = () => {
    goTo(`${ROUTE_PATH.FM_PERMISSION_APPLICATION}?mode=edit`);
  };
  
  // 로딩 중
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
      {/* 상태 카드 */}
      <SettingsFMPermissionStatusCard permission={permission} />
      {/* 신청 정보 */}
      <SettingsFMPermissionInfoCard permission={permission} />
      {/* 제출한 서류 */}
      <SettingsFMPermissionDocumentCard permission={permission} />
      {/* 버튼 */}
      <SettingsFMPermissionButton
        permission={permission}
        goBack={goBack}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default SettingsFMPermissionStatusContent;
