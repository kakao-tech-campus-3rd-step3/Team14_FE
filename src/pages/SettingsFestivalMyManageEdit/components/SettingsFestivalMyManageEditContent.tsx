import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { putMyFestivalPermission } from '@/apis/festivalManager/putMyFestivalPermission';
import { getMyFestivalPermissionDetail } from '@/apis/festivalManager/getMyFestivalPermissionDetail';
import ApplicationDocumentCard from '@/pages/SettingsFMPermissionApplication/components/ApplicationDocumentCard';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import FestivalPermissionInfoCard from '@/pages/SettingsFestivalMyManageDetail/components/FestivalPermissionInfoCard';
import useNav from '@/hooks/useNav';
import { useDocumentUpload } from '@/hooks/useDocumentUpload';
import { ROUTE_PATH } from '@/constants/routes';
import { isAxiosError } from 'axios';

/**
 * 축제 관리 신청 수정 내용 컴포넌트
 * @returns 축제 관리 신청 수정 내용 컴포넌트
 * 축제 관리 신청 수정 정보를 표시합니다.
 */
const SettingsFestivalMyManageEditContent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { goBack } = useNav();
  const queryClient = useQueryClient();

  const { documents, setDocuments, isUploading, handleFileUpload } = useDocumentUpload();

  const { data: detailData, isLoading: isDetailLoading } = useQuery({
    queryKey: ['festivalPermission', id],
    queryFn: () => getMyFestivalPermissionDetail(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (detailData?.data.content.docs) {
      const existingDocs = detailData.data.content.docs.map((url, index) => ({
        id: index,
        presignedUrl: url,
        fileName: `기존 서류 ${index + 1}`,
      }));
      setDocuments(existingDocs);
    }
  }, [detailData, setDocuments]);

  const { mutate: updateApplication, isPending } = useMutation({
    mutationFn: (body: { documents: Array<{ id: number; presignedUrl: string }> }) =>
      putMyFestivalPermission(id!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['festivalPermission', id] });
      queryClient.invalidateQueries({ queryKey: ['festivalPermissions'] });

      alert('축제 관리 신청이 수정되었습니다!');
      navigate(`${ROUTE_PATH.FESTIVAL_MY_MANAGE}/${id}`);
    },
    onError: (error: unknown) => {
      if (isAxiosError(error) && error.response?.status === 400) {
        alert('수정할 수 없습니다. 입력값을 확인해주세요.');
      } else {
        alert('수정에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

  const handleSubmit = () => {
    if (documents.length === 0) {
      return alert('최소 1개 이상의 증빙 서류를 업로드해주세요.');
    }

    updateApplication({
      documents: documents.map((doc) => ({
        id: doc.id,
        presignedUrl: doc.presignedUrl,
      })),
    });
  };

  const handleCancel = () => {
    goBack();
  };

  if (isDetailLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" message="정보를 불러오는 중..." />
      </div>
    );
  }

  const permission = detailData?.data.content;

  return (
    <div className="bg-white rounded-lg p-4 m-4 shadow-sm">
      {permission && <FestivalPermissionInfoCard permission={permission} />}

      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">📌 수정 안내</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 증빙 서류를 수정할 수 있습니다.</li>
          <li>• 수정 후 다시 심사가 진행됩니다.</li>
        </ul>
      </div>

      <ApplicationDocumentCard
        documents={documents}
        setDocuments={setDocuments}
        handleFileUpload={handleFileUpload}
        isUploading={isUploading}
      />

      <FormSubmitButtons
        onCancel={handleCancel}
        onPatch={handleSubmit}
        isDisabled={isPending || isUploading || documents.length === 0}
        isLoading={isPending || isUploading}
        submitLabel="수정하기"
        isEdit={true}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default SettingsFestivalMyManageEditContent;
