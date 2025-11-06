import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postFestivalManagerApply } from '@/apis/festivalManager/postFestivalManagerApply';
import getFestivalInfo from '@/apis/festivals/getFestivalInfo';
import ApplicationDocumentCard from '@/pages/SettingsFMPermissionApplication/components/ApplicationDocumentCard';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import type { FestivalManagerApplyRequest } from '@/apis/festivalManager/postFestivalManagerApply';
import FestivalInfoManagerApplyInfoCard from '@/pages/FestivalInfoManagerApply/components/FestivalInfoManagerApplyInfoCard';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import FestivalInfoManagerApplyRuleCard from '@/pages/FestivalInfoManagerApply/components/FestivalInfoManagerApplyRuleCard';
import useNav from '@/hooks/useNav';
import { useDocumentUpload } from '@/hooks/useDocumentUpload';
import { isAxiosError } from 'axios';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import { ROUTE_PATH } from '@/constants/routes';
import { showToastErrorMessage, showToastSuccessMessage } from '@/utils/showToastMessage';
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
  const { documents, setDocuments, isUploading, handleFileUpload } = useDocumentUpload();

  // 축제 정보 가져오기
  const { data: festivalData, isLoading: isFestivalLoading } = useQuery({
    queryKey: ['festival', festivalId],
    queryFn: () => getFestivalInfo({ festivalId: festivalId || '' }),
    select: (data) => data.data.content,
    enabled: !!festivalId,
  });

  // 신청 mutation
  const { mutate: submitApplication, isPending } = useMutation({
    mutationFn: (body: FestivalManagerApplyRequest) => postFestivalManagerApply(festivalId!, body),
    onSuccess: () => {
      showToastSuccessMessage(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.SUCCESS);
      navigate(generatePath(ROUTE_PATH.FESTIVAL_INFO, { festivalId: festivalId || '' }));
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          showToastErrorMessage(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.ALREADY_APPLIED);
        } else if (error.response?.status === 400) {
          showToastErrorMessage(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.INVALID_REQUEST);
        } else if (error.response?.status === 403) {
          showToastErrorMessage(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.NO_PERMISSION);
        } else {
          showToastErrorMessage(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.ERROR);
        }
      } else {
        showToastErrorMessage(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.ERROR);
      }
    },
  });

  const handleSubmit = () => {
    if (documents.length === 0) {
      return showToastErrorMessage(SYSTEM_MESSAGES.FM_APPLICATION_VALIDATION.DOCUMENT_REQUIRED);
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
