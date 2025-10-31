import FestivalForm from '@/components/festivalForm/FestivalForm';
import { postFestival } from '@/apis/festivals/postFestival';
import { showToastSuccessMessage, showToastAxiosError, showToastErrorMessage } from '@/utils/showToastMessage';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import { useMutation } from '@tanstack/react-query';
import useNav from '@/hooks/useNav';
/**
 * 축제 등록 내용 컴포넌트
 * @returns 축제 등록 내용 컴포넌트
 * 축제 등록 정보를 표시합니다.
 */
const SettingsFestivalRegisterContent = () => {
  const { goBack } = useNav();
  const { mutate: submitCreate, isPending } = useMutation({
    mutationFn: (body: any) => postFestival(body),
    onSuccess: () => {
      showToastSuccessMessage(SYSTEM_MESSAGES.FESTIVAL_REGISTER.SUCCESS);
      goBack();
    },
    onError: (e) => {
      showToastAxiosError(e);
      showToastErrorMessage(SYSTEM_MESSAGES.FESTIVAL_REGISTER.ERROR);
    },
  });

  return (
    <FestivalForm
      submitLabel="축제 등록"
      isSubmitting={isPending}
      onSubmit={({ formData, posterInfo, imageInfos }) =>
        submitCreate({
          title: formData.title,
          areaCode: Number(formData.areaCode),
          addr1: formData.addr1,
          addr2: formData.addr2,
          posterInfo,
          imageInfos,
          startDate: formData.startDate,
          endDate: formData.endDate,
          homePage: formData.homePage,
          overView: formData.overView,
        })
      }
    />
  );
};
export default SettingsFestivalRegisterContent;