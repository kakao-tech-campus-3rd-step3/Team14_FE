import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postFestivalManagerApply } from '@/apis/festivalManager/postFestivalManagerApply';
import getFestivalInfo from '@/apis/festivals/getFestivalInfo';
import { MAX_DOCUMENT_COUNT } from '@/constants/maxMediaSize';
import ApplicationDocumentCard from '@/pages/SettingsFMPermissionApplication/components/ApplicationDocumentCard';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import { createDocumentPicker } from '@/utils/filePicker';
import type { FestivalManagerApplyRequest } from '@/apis/festivalManager/postFestivalManagerApply';
import FestivalInfoManagerApplyInfoCard from './FestivalInfoManagerApplyInfoCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import FestivalInfoManagerApplyRuleCard from './FestivalInfoManagerApplyRuleCard';
import useNav from '@/hooks/useNav';

/**
 * 축제 관리 신청 폼 컴포넌트
 * 축제 관리자로 승급한 신청자가 자신이 원하는 축제에 대해 신청할 수 있습니다.
 * 축제 정보, 규칙, 서류 업로드, 제출 버튼을 표시합니다.
 * @returns 축제 관리 신청 폼 컴포넌트
 */
const FestivalInfoManagerApplyForm = () => {
  const { festivalId } = useParams<{ festivalId: string }>();
  const navigate = useNavigate();
  const { goBack } = useNav();
  const [documents, setDocuments] = useState<
    Array<{ id: number; presignedUrl: string; fileName: string }>
  >([]);
  const [isUploading, setIsUploading] = useState(false);

  // 축제 정보 가져오기
  const { data: festivalData, isLoading: isFestivalLoading } = useQuery({
    queryKey: ['festival', festivalId],
    queryFn: () => getFestivalInfo({ festivalId: festivalId || '' }),
    select: (data) => data.data.content,
    enabled: !!festivalId,
  });

  // 신청 mutation
  const { mutate: submitApplication, isPending } = useMutation({
    mutationFn: (body: FestivalManagerApplyRequest) =>
      postFestivalManagerApply(festivalId!, body),
    onSuccess: () => {
      alert('축제 관리 신청이 완료되었습니다!');
      navigate(`/festival/${festivalId}`);
    },
    onError: (error: any) => {
      if (error.response?.status === 409) {
        alert('이미 이 축제의 관리자 신청이 존재합니다.');
      } else if (error.response?.status === 400) {
        alert('신청할 수 없습니다. 입력값을 확인해주세요.');
      } else if (error.response?.status === 403) {
        alert('축제 관리자 권한이 필요합니다.');
      } else {
        alert('신청 제출에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

  // 파일 업로드
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

  const handleSubmit = () => {
    if (documents.length === 0) {
      return alert('최소 1개 이상의 증빙 서류를 업로드해주세요.');
    }

    submitApplication({
      documents: documents.map((doc) => ({
        id: doc.id,
        presignedUrl: doc.presignedUrl,
      })),
    });
  };

  const handleCancel = () => {
    goBack();
  };

  if (isFestivalLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" message="축제 정보를 불러오는 중..." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 m-4 shadow-sm">
      {festivalData && <FestivalInfoManagerApplyInfoCard festivalData={festivalData} />}

      <FestivalInfoManagerApplyRuleCard />

      <ApplicationDocumentCard
        documents={documents}
        setDocuments={setDocuments}
        handleFileUpload={handleFileUpload}
        isUploading={isUploading}
      />

      <FormSubmitButtons
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        isDisabled={isPending || isUploading || documents.length === 0}
        isLoading={isPending || isUploading}
        submitLabel="신청하기"
        isEdit={false}
        onPatch={() => {}}
      />
    </div>
  );
};

export default FestivalInfoManagerApplyForm;
