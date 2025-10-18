import { useState } from 'react';
import useNav from '@/hooks/useNav';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  postFMPermission,
  type PostFMPermissionBody,
} from '@/apis/festivalManager/postFMPermission';
import { MAX_DOCUMENT_COUNT } from '@/constants/maxMediaSize';
import ApplicationDepartmentCard from './ApplicationDepartmentCard';
import ApplicaitonInfoCard from './ApplicaitonInfoCard';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import ApplicationDocumentCard from './ApplicationDocumentCard';
import { createDocumentPicker } from '@/utils/filePicker';

const SettingsFMPermissionApplicationForm = () => {
  const [department, setDepartment] = useState('');
  const [documents, setDocuments] = useState<
Array<{ id: number; presignedUrl: string; fileName: string }>
  >([]);
  const [isUploading, setIsUploading] = useState(false);

  const { goBack } = useNav();
  const queryClient = useQueryClient();

  const { mutate: submitApplication, isPending } = useMutation({
    mutationFn: (body: PostFMPermissionBody) => postFMPermission(body),
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

  const pickAndUploadDocuments = createDocumentPicker(
    (uploaded) => {
      const totalAfterUpload = documents.length + uploaded.length;
      if (totalAfterUpload > MAX_DOCUMENT_COUNT) {
        alert(
          `최대 ${MAX_DOCUMENT_COUNT}개까지만 업로드할 수 있습니다.\n` +
            `현재: ${documents.length}개, 선택: ${uploaded.length}개`,
        );
        return;
      }
      setDocuments((prev) => [...prev, ...uploaded]);
    },
    setIsUploading,
    (error) => alert(error),
  );

  const handleFileUpload = () => {
    pickAndUploadDocuments();
  };
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
        onCancel={goBack}
        onSubmit={handleSubmit}
        isDisabled={isPending || isUploading || documents.length === 0 || !department.trim()}
        isLoading={isPending || isUploading}
        submitLabel="신청하기"
        loadingLabel="제출 중..."
      />
    </div>
  );
};

export default SettingsFMPermissionApplicationForm;
