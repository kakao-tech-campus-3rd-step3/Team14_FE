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
import { isAxiosError } from 'axios';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';

interface SettingsFMPermissionApplicationFormProps {
  initialData?: {
    department: string;
    documents: Array<{ id: number; presignedUrl: string; fileName: string }>;
  };
  isEdit?: boolean;
}
/**
 * 축제 관리자 신청 폼
 * @param initialData - 초기 데이터
 * @param isEdit - 수정 모드 여부
 * @returns 축제 관리자 신청 폼 컴포넌트
 * 축제 관리자 신청 폼을 표시합니다.
 */
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
      alert(SYSTEM_MESSAGES.FM_APPLICATION.SUBMIT_SUCCESS);
      goBack();
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          alert(SYSTEM_MESSAGES.FM_APPLICATION.ALREADY_EXISTS);
        } else if (error.response?.status === 400) {
          alert(SYSTEM_MESSAGES.FM_APPLICATION.CANNOT_APPLY);
        } else {
          alert(SYSTEM_MESSAGES.FM_APPLICATION.SUBMIT_ERROR);
        }
      } else {
        alert(SYSTEM_MESSAGES.FM_APPLICATION.SUBMIT_ERROR);
      }
    },
  });
  const { mutate: updateApplication, isPending: isUpdating } = useMutation({
    mutationFn: (body: FMPermissionRequest) => putFMPermission(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fmPermission'] });
      alert(SYSTEM_MESSAGES.FM_APPLICATION.UPDATE_SUCCESS);
      goBack();
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        if (error.response?.status === 403) {
          alert(SYSTEM_MESSAGES.FM_APPLICATION.UPDATE_NO_PERMISSION);
        } else if (error.response?.status === 404) {
          alert(SYSTEM_MESSAGES.FM_APPLICATION.UPDATE_NOT_FOUND);
        } else if (error.response?.status === 400) {
          alert(SYSTEM_MESSAGES.FM_APPLICATION.UPDATE_INVALID_REQUEST);
        } else {
          alert(SYSTEM_MESSAGES.FM_APPLICATION.UPDATE_ERROR);
        }
      } else {
        alert(SYSTEM_MESSAGES.FM_APPLICATION.UPDATE_ERROR);
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
      return alert(SYSTEM_MESSAGES.FM_APPLICATION_VALIDATION.DEPARTMENT_REQUIRED);
    }

    if (trimmedDepartment.length < 2 || trimmedDepartment.length > 50) {
      return alert(SYSTEM_MESSAGES.FM_APPLICATION_VALIDATION.DEPARTMENT_LENGTH);
    }

    if (documents.length === 0) {
      return alert(SYSTEM_MESSAGES.FM_APPLICATION_VALIDATION.DOCUMENT_REQUIRED);
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

      <ApplicaitonInfoCard />

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
