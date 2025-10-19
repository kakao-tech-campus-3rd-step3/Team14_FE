import { useState } from 'react';
import useNav from '@/hooks/useNav';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFMPermission } from '@/apis/festivalManager/postFMPermission';
import ApplicationDepartmentCard from '@/pages/SettingsFMPermissionApplication/components/ApplicationDepartmentCard';
import ApplicaitonInfoCard from '@/pages/SettingsFMPermissionApplication/components/ApplicaitonInfoCard';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import ApplicationDocumentCard from '@/pages/SettingsFMPermissionApplication/components/ApplicationDocumentCard';
import { useDocumentUpload } from '@/hooks/useDocumentUpload';
import type { FMPermissionRequest } from '@/types/FMPermissionsRequest';
import { putFMPermission } from '@/apis/festivalManager/putFMPermission';

interface SettingsFMPermissionApplicationFormProps {
  initialData?: {
    department: string;
    documents: Array<{ id: number; presignedUrl: string; fileName: string }>;
  };
  isEdit?: boolean;
}

const SettingsFMPermissionApplicationForm = ({
  initialData,
  isEdit = false,
}: SettingsFMPermissionApplicationFormProps) => {
  const [department, setDepartment] = useState(initialData?.department || '');
  const { documents, setDocuments, isUploading, handleFileUpload } = useDocumentUpload(
    initialData?.documents || [],
  );

  const { goBack } = useNav();
  const queryClient = useQueryClient();

  const { mutate: submitApplication, isPending } = useMutation({
    mutationFn: (body: FMPermissionRequest) => postFMPermission(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fmPermission'] });
      alert('축제 관리자 신청이 완료되었습니다.');
      goBack();
    },
    onError: (error: any) => {
      if (error.response?.status === 409) {
        alert('이미 신청서가 존재합니다.');
      } else if (error.response?.status === 400) {
        alert('신청할 수 없습니다. 관리자에게 문의해주세요.');
      } else {
        alert('신청서 제출에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });
  // 수정용 mutation
  const { mutate: updateApplication, isPending: isUpdating } = useMutation({
    mutationFn: (body: FMPermissionRequest) => putFMPermission(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fmPermission'] });
      alert('신청서 수정이 완료되었습니다.');
      goBack();
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        alert('수정 권한이 없습니다.');
      } else if (error.response?.status === 404) {
        alert('신청서를 찾을 수 없습니다.');
      } else if (error.response?.status === 400) {
        alert('잘못된 요청입니다. 입력값을 확인해주세요.');
      } else {
        alert('신청서 수정에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

  //TODO: 리뷰 작성폼에 있는 함수와 함께 재활용할 수 있도록 분리할 예정
  const handleSubmit = async () => {
    const trimmedDepartment = department.trim();

    if (!trimmedDepartment) {
      return alert('부서명을 입력해주세요.');
    }

    if (trimmedDepartment.length < 2 || trimmedDepartment.length > 50) {
      return alert('부서명은 2자 이상 50자 이하여야 합니다.');
    }

    if (documents.length === 0) {
      return alert('최소 1개 이상의 증빙 서류를 업로드해주세요.');
    }

    submitApplication({
      department: trimmedDepartment,
      documents: documents.map((doc) => ({
        id: doc.id,
        presignedUrl: doc.presignedUrl,
      })),
    });
  };

  // handlePatch 함수 수정
  const handlePatch = async () => {
    const trimmedDepartment = department.trim();

    if (!trimmedDepartment) {
      return alert('부서명을 입력해주세요.');
    }

    if (trimmedDepartment.length < 2 || trimmedDepartment.length > 50) {
      return alert('부서명은 2자 이상 50자 이하여야 합니다.');
    }

    if (documents.length === 0) {
      return alert('최소 1개 이상의 증빙 서류를 업로드해주세요.');
    }

    updateApplication({
      department: trimmedDepartment,
      documents: documents.map((doc) => ({
        id: doc.id,
        presignedUrl: doc.presignedUrl,
      })),
    });
  };
  return (
    <div className="bg-white rounded-lg p-4 m-4 shadow-sm">
      <ApplicationDepartmentCard department={department} setDepartment={setDepartment} />

      <ApplicationDocumentCard
        documents={documents}
        setDocuments={setDocuments}
        handleFileUpload={handleFileUpload}
        isUploading={isUploading}
      />

      {/* 축제 관리자 승급 신청자를 위한 안내사항 */}
      <ApplicaitonInfoCard />

      {/* 폼 제출 버튼 */}
      <FormSubmitButtons
        onPatch={handlePatch}
        isEdit={isEdit}
        onCancel={goBack}
        onSubmit={handleSubmit}
        isDisabled={isPending || isUploading || documents.length === 0 || !department.trim()}
        isLoading={isPending || isUploading || isUpdating}
        submitLabel={isEdit ? '수정하기' : '신청하기'}
      />
    </div>
  );
};

export default SettingsFMPermissionApplicationForm;
