import { useQuery } from '@tanstack/react-query';
import { getMyFMPermission } from '@/apis/festivalManager/getMyFMPermission';
import SettingsFMPermissionApplicationForm from '@/pages/SettingsFMPermissionApplication/components/SettingsFMPermissionApplicationForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorComponent from '@/components/common/ErrorComponent';

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

  // 기존 데이터를 폼 형식으로 변환
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
