import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postFestivalManagerApply } from '@/apis/festivalManager/postFestivalManagerApply';
import getFestivalInfo from '@/apis/festivals/getFestivalInfo';
import ApplicationDocumentCard from '@/pages/SettingsFMPermissionApplication/components/ApplicationDocumentCard';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import type { FestivalManagerApplyRequest } from '@/apis/festivalManager/postFestivalManagerApply';
import FestivalInfoNoticeRuleCard from '@/pages/FestivalInfoNoticeCreate/components/FestivalInfoNoticeRuleCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import useNav from '@/hooks/useNav';
import { useDocumentUpload } from '@/hooks/useDocumentUpload';
import { isAxiosError } from 'axios';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import { ROUTE_PATH } from '@/constants/routes';
import FestivalInfoNoticeInfoCard from '@/pages/FestivalInfoNoticeCreate/components/FestivalInfoNoticeInfoCard';
import type { FestivalInfo } from '@/types/FestivalType';
/**
 * 축제 공지사항 폼 컴포넌트
 * 축제 공지사항을 작성할 수 있습니다.
 * 축제 정보, 공지사항 제목, 공지사항 내용, 제출 버튼을 표시합니다.
 * @returns 축제 공지사항 폼 컴포넌트
 */
const FestivalInfoNoticeForm = ({ festivalData }: { festivalData: FestivalInfo }) => {
  const navigate = useNavigate();
  const { goBack } = useNav();

  // 신청 mutation
  const { mutate: submitApplication, isPending } = useMutation({
    mutationFn: (body: FestivalManagerApplyRequest) => postFestivalManagerApply(festivalData.id.toString(), body),
    onSuccess: () => {
      alert(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.SUCCESS);
      navigate(generatePath(ROUTE_PATH.FESTIVAL_INFO, { festivalId: festivalData.id.toString() }));
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          alert(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.ALREADY_APPLIED);
        } else if (error.response?.status === 400) {
          alert(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.INVALID_REQUEST);
        } else if (error.response?.status === 403) {
          alert(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.NO_PERMISSION);
        } else {
          alert(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.ERROR);
        }
      } else {
        alert(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.ERROR);
      }
    },
  });

  const handleSubmit = () => {
    submitApplication({
      title: title,
      content: content,
      images: [],
    });
  };

  const handleCancel = () => {
    goBack();
  };


  return (
    <div className="bg-white rounded-lg p-4 m-4 shadow-sm">

      {festivalData && <FestivalInfoNoticeInfoCard festivalData={festivalData} />}
      <FestivalInfoNoticeRuleCard />
      <FormSubmitButtons
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        isDisabled={isPending}
        isLoading={isPending}
        submitLabel="공지사항 작성하기"
        isEdit={false}
        onPatch={() => {}}
      />
    </div>
  );
};

export default FestivalInfoNoticeForm;
