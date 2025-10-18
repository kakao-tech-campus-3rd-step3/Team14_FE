import { useState } from 'react';
import useNav from '@/hooks/useNav';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  postFMPermission,
  type PostFMPermissionBody,
} from '@/apis/festivalManager/postFMPermission';
import { uploadDocumentFiles } from '@/utils/s3Upload';
import MAX_MEDIA_SIZE, { MAX_DOCUMENT_COUNT } from '@/constants/maxMediaSize';
import ApplicationDepartmentCard from './ApplicationDepartmentCard';
import ApplicaitonInfoCard from './ApplicaitonInfoCard';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import ApplicationDocumentCard from './ApplicationDocumentCard';

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
      //신청서가 존재할 경우, 사용자가 임의적으로 접근하지 않는 한 신청서 작성으로 들어올 수 없도록 구현하였지만 문제가 발생할 경우 대비 에러 처리하였습니다.
      if (error.response?.status === 409) {
        alert('이미 신청서가 존재합니다.');
      } else if (error.response?.status === 400) {
        // 이미 사용자의 role이 매니저일 경우, 신청서를 작성할 때 오류 발생
        alert('신청할 수 없습니다. 관리자에게 문의해주세요.');
      } else {
        alert('신청서 제출에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

  const handleFileUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.hwp,image/*';
    input.multiple = true;

    input.onchange = async () => {
      const files = input.files;
      if (!files || files.length === 0) return;

      try {
        setIsUploading(true);
        const fileArray = Array.from(files);
        // 한 번에 선택한 파일 개수 체크
        if (fileArray.length > MAX_DOCUMENT_COUNT) {
          alert(`한 번에 최대 ${MAX_DOCUMENT_COUNT}개까지만 선택할 수 있습니다.`);
          setIsUploading(false);
          input.remove();
          return;
        }

        // 누적 총 개수 체크
        const totalAfterUpload = documents.length + fileArray.length;
        if (totalAfterUpload > MAX_DOCUMENT_COUNT) {
          alert(
            `최대 ${MAX_DOCUMENT_COUNT}개까지만 업로드할 수 있습니다.\n` +
              `현재: ${documents.length}개, 선택: ${fileArray.length}개`,
          );
          setIsUploading(false);
          input.remove();
          return;
        }
        // 파일 크기 검증 (각 파일 최대 10MB)
        const oversizedFiles = fileArray.filter((f) => f.size > MAX_MEDIA_SIZE.DOCUMENT);
        if (oversizedFiles.length > 0) {
          alert(
            `파일 크기는 ${MAX_MEDIA_SIZE.DOCUMENT / 1024 / 1024}MB를 초과할 수 없습니다.\n문제 파일: ${oversizedFiles.map((f) => f.name).join(', ')}`,
          );
          return;
        }

        const uploaded = await uploadDocumentFiles(fileArray);
        setDocuments((prev) => [...prev, ...uploaded]);
      } catch (error) {
        alert('파일 업로드에 실패했습니다. 다시 시도해주세요.');
        console.error(error);
      } finally {
        setIsUploading(false);
        input.remove();
      }
    };

    input.click();
  };

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
    <div className="bg-white rounded-lg p-4 shadow-sm">
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
