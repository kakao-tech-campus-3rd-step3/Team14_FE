import { useQuery } from '@tanstack/react-query';
import { getMyFMPermission } from '@/apis/festivalManager/getMyFMPermission';
import SettingsFMPermissionApplicationForm from '@/pages/SettingsFMPermissionApplication/components/SettingsFMPermissionApplicationForm';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import ErrorComponent from '@/components/common/ErrorComponent';

/**
 * 축제 관리자 신청 수정 폼
 * @returns 축제 관리자 신청 수정 폼 컴포넌트
 * 축제 관리자 신청 수정 폼을 표시합니다.
 */
const SettingsFMPermissionEditForm = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['fmPermission'],
    queryFn: getMyFMPermission,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" message="신청서를 불러오는 중..." />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <ErrorComponent
        title="오류가 발생했습니다"
        message="신청서를 불러올 수 없습니다."
        showBackButton={true}
      />
    );
  }

  const permission = data.data.content;

  const initialData = {
    department: permission.department,
    documents: permission.docsUrls.map((url, index) => ({
      id: index + 1,
      presignedUrl: url,
      fileName: `문서_${index + 1}.pdf`,
    })),
  };

  return <SettingsFMPermissionApplicationForm initialData={initialData} isEdit={true} />;
};

export default SettingsFMPermissionEditForm;
