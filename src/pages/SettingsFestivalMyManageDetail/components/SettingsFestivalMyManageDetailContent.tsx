import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getMyFestivalPermissionDetail } from '@/apis/festivalManager/getMyFestivalPermissionDetail';
import { deleteMyFestivalPermission } from '@/apis/festivalManager/deleteMyFestivalPermission';
import useNav from '@/hooks/useNav';
import { ROUTE_PATH } from '@/constants/routes';
import axios from 'axios';
import EmptyComponent from '@/components/common/EmptyComponent';
import ErrorComponent from '@/components/common/ErrorComponent';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import FestivalPermissionStatusCard from '@/pages/SettingsFestivalMyManageDetail/components/FestivalPermissionStatusCard';
import FestivalPermissionInfoCard from '@/pages/SettingsFestivalMyManageDetail/components/FestivalPermissionInfoCard';
import FestivalPermissionDocumentCard from '@/pages/SettingsFestivalMyManageDetail/components/FestivalPermissionDocumentCard';
import FestivalPermissionButtons from '@/pages/SettingsFestivalMyManageDetail/components/FestivalPermissionButtons';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
/**
 * 축제 관리자 신청 상세 내용 컴포넌트
 * @returns 축제 관리자 신청 상세 내용 컴포넌트
 * 축제 관리자 신청 상세 정보를 표시합니다.
 */
const SettingsFestivalMyManageDetailContent = () => {
  const { id } = useParams<{ id: string }>();
  const { goBack } = useNav();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['festivalPermission', id],
    queryFn: () => getMyFestivalPermissionDetail(id!),
    enabled: !!id,
    retry: false,
  });

  const { mutate: deleteApplication, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteMyFestivalPermission(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['festivalPermissions'] });
      alert(SYSTEM_MESSAGES.FM_APPLICATION.DELETE_SUCCESS);
      navigate(ROUTE_PATH.FESTIVAL_MY_MANAGE);
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
    navigate(`${ROUTE_PATH.FESTIVAL_MY_MANAGE}/${id}/edit`);
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
          title="신청서를 찾을 수 없습니다"
          description="삭제되었거나 존재하지 않는 신청서입니다."
        />
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

  return (
    <div className="p-4 space-y-4 pb-20">
      <FestivalPermissionStatusCard state={permission.state} />
      <FestivalPermissionInfoCard permission={permission} />

      <FestivalPermissionDocumentCard docs={permission.docs} />

      <FestivalPermissionButtons
        state={permission.state}
        goBack={goBack}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default SettingsFestivalMyManageDetailContent;
