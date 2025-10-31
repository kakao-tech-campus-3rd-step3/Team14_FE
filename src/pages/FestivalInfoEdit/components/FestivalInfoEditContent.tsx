import LoadingPage from '@/components/loading/LoadingPage';
import ErrorPage from '@/components/error/ErrorPage';
import FestivalForm from '@/components/festivalForm/FestivalForm';
import getFestivalInfo from '@/apis/festivals/getFestivalInfo';
import { patchFestival } from '@/apis/festivals/patchFestival';
import {
  showToastAxiosError,
  showToastSuccessMessage,
  showToastErrorMessage,
} from '@/utils/showToastMessage';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import { ROUTE_PATH } from '@/constants/routes';
import useNav from '@/hooks/useNav';
import { queryClient } from '@/utils/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { generatePath, useParams } from 'react-router-dom';
import { useState } from 'react';
import type { FestivalUpdateRequest } from '@/types/FestivalFormTypes';
import { cleanUrl } from '@/utils/s3Upload';
/**
 * 축제 정보 수정 내용 컴포넌트
 * 기존에 축제 등록 페이지에서 활용하던 컴포넌트들을 공용으로 옮긴 뒤 재사용해서 구성하였습니다.
 * @returns 축제 정보 수정 내용 컴포넌트
 * 축제 정보 수정 정보를 표시합니다.
 */
const FestivalInfoEditContent = () => {
  const { festivalId } = useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ['festival', festivalId],
    queryFn: () => getFestivalInfo({ festivalId: festivalId || '' }),
    select: (res) => res.data.content,
    enabled: !!festivalId,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { goTo } = useNav();
  const { mutate: submitEdit } = useMutation({
    mutationFn: (body: FestivalUpdateRequest) => patchFestival(festivalId!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['festival', festivalId] });
      queryClient.invalidateQueries({ queryKey: ['festivals'] });
      queryClient.invalidateQueries({ queryKey: ['search'] });
      queryClient.invalidateQueries({ queryKey: ['reviews', festivalId] });
      showToastSuccessMessage(SYSTEM_MESSAGES.FESTIVAL_EDIT.SUCCESS);
      goTo(generatePath(ROUTE_PATH.FESTIVAL_INFO, { festivalId: festivalId! }));
    },
    onError: (e) => {
      showToastAxiosError(e);
      showToastErrorMessage(SYSTEM_MESSAGES.FESTIVAL_EDIT.ERROR);
    },
  });

  const handleSubmit = async (payload: {
    formData: {
      title: string;
      areaCode: string;
      addr1: string;
      addr2: string;
      startDate: string;
      endDate: string;
      homePage: string;
      overView: string;
    };
    posterInfo: { id: number; presignedUrl: string };
    imageInfos: { id: number; presignedUrl: string }[];
  }) => {
    try {
      setIsSubmitting(true);
      await submitEdit({
        title: payload.formData.title,
        areaCode: Number(payload.formData.areaCode),
        addr1: payload.formData.addr1,
        addr2: payload.formData.addr2,
        posterInfo: {
          id: payload.posterInfo.id,
          presignedUrl: cleanUrl(payload.posterInfo.presignedUrl),
        },
        imageInfos: payload.imageInfos.map((image) => ({
          id: image.id,
          presignedUrl: cleanUrl(image.presignedUrl),
        })),
        startDate: payload.formData.startDate,
        endDate: payload.formData.endDate,
        homePage: payload.formData.homePage,
        overView: payload.formData.overView,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) return <LoadingPage title="축제 수정" message="불러오는 중" variant="page" />;
  if (isError || !data)
    return <ErrorPage title="축제 수정" message="오류가 발생했습니다." variant="page" />;

  return (
    <FestivalForm
      initial={{
        form: data
          ? {
              title: data.title,
              areaCode: String(data.areaCode ?? '0'),
              addr1: data.addr1,
              addr2: data.addr2,
              startDate: data.startDate,
              endDate: data.endDate,
              homePage: data.homePage,
              overView: data.overView,
            }
          : undefined,
        posterUrl: data?.posterInfo ?? null,
        imageUrls: data?.imageInfos ?? [],
      }}
      isSubmitting={isSubmitting}
      submitLabel="수정하기"
      onSubmit={handleSubmit}
    />
  );
};

export default FestivalInfoEditContent;
