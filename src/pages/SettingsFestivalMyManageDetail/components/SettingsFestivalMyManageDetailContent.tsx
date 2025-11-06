import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getMyFestivalPermissionDetail } from '@/apis/festivalManager/getMyFestivalPermissionDetail';
import { deleteMyFestivalPermission } from '@/apis/festivalManager/deleteMyFestivalPermission';
import useNav from '@/hooks/useNav';
import { ROUTE_PATH } from '@/constants/routes';
import axios from 'axios';
import EmptyComponent from '@/components/common/EmptyComponent';
import ErrorComponent from '@/components/error/ErrorComponent';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import FestivalPermissionStatusCard from '@/pages/SettingsFestivalMyManageDetail/components/FestivalPermissionStatusCard';
import FestivalPermissionInfoCard from '@/pages/SettingsFestivalMyManageDetail/components/FestivalPermissionInfoCard';
import FestivalPermissionDocumentCard from '@/pages/SettingsFestivalMyManageDetail/components/FestivalPermissionDocumentCard';
import FestivalPermissionButtons from '@/pages/SettingsFestivalMyManageDetail/components/FestivalPermissionButtons';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { useDeleteWithConfirm } from '@/hooks/useDeleteWithConfirm';

/**
 * 축제 관리 신청 상세 내용 컴포넌트
 * @returns 축제 관리 신청 상세 내용 컴포넌트
 * 축제 관리 신청 상세 정보를 표시합니다.
 */
const SettingsFestivalMyManageDetailContent = () => {
  const { id } = useParams<{ id: string }>();
  const { goBack } = useNav();
  const navigate = useNavigate();

  const {
    isConfirmOpen,
    isDeleting,
    handleDelete: handleDeleteClick,
    handleConfirmDelete,
    setIsConfirmOpen,
  } = useDeleteWithConfirm(
    async (id: number) => {
      await deleteMyFestivalPermission(id.toString());
      navigate(ROUTE_PATH.FESTIVAL_MY_MANAGE);
    },
    ['festivalPermissions'],
    SYSTEM_MESSAGES.FM_APPLICATION.DELETE_SUCCESS,
    SYSTEM_MESSAGES.FM_APPLICATION.DELETE_ERROR,
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['festivalPermission', id],
    queryFn: () => getMyFestivalPermissionDetail(id!),
    enabled: !!id,
    retry: false,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
  });

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

  const {  message } = (() => {
    switch (permission.state) {
      case 'ACCEPTED':
        return {  message: SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.APPROVED_DELETE_CONFIRM };
      default:
        return { message: SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.DELETE_CONFIRM };
    }
  })();
  
  return (
    <div className="p-4 space-y-4 pb-20">
      <FestivalPermissionStatusCard state={permission.state} />
      <FestivalPermissionInfoCard permission={permission} />

      <FestivalPermissionDocumentCard docs={permission.docs} />

      <FestivalPermissionButtons
        state={permission.state}
        goBack={goBack}
        handleEdit={handleEdit}
        handleDelete={() => handleDeleteClick(permission.id)}
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

export default SettingsFestivalMyManageDetailContent;
