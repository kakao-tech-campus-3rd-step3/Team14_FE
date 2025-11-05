import FestivalsSection from '@/pages/Festivals/components/FestivalsSection';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import postFestivalsPick, { type PostFestivalsPickBody } from '@/apis/festivals/postFestivalsPick';
import { useEffect } from 'react';
import type { ApiResponseList } from '@/apis/apiResponse';
import type { Festival } from '@/types/FestivalType';
import type { AxiosResponse } from 'axios';

const FestivalsAISection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { areaId } = useParams();

  // Pick 페이지에서 전달된 요청 데이터
  const requestData = location.state?.requestData as PostFestivalsPickBody;

  // 1회용 사용 후 state 정리
  useEffect(() => {
    if (requestData) {
      // React Router의 navigate를 사용해서 state 정리
      const newState = { ...location.state };
      delete newState.requestData;

      // state가 비어있으면 undefined, 아니면 정리된 state로 교체
      const cleanState = Object.keys(newState).length > 0 ? newState : undefined;

      navigate(location.pathname + location.search, {
        replace: true,
        state: cleanState,
      });
    }
  }, [requestData, location.pathname, location.search, location.state, navigate]);

  const queryClient = useQueryClient();

  // API 호출을 위한 mutation (성공 시 캐시에 저장)
  const {
    mutate: mutateFestivalPick,
    isPending,
    data: festivalData,
  } = useMutation({
    mutationFn: (requestData: PostFestivalsPickBody) => postFestivalsPick({ requestData }),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data, variables) => {
      const cacheKey = ['aiPick', variables.areaCode];
      queryClient.setQueryData(cacheKey, data);
    },
  });

  // requestData가 있으면 요청을 우선 수행
  useEffect(() => {
    if (requestData && !isPending) {
      mutateFestivalPick(requestData);
    }
  }, [requestData, isPending, mutateFestivalPick, queryClient]);

  // requestData가 있으면 해당 응답만 사용,
  const title = '맞춤 AI Pick 축제';
  if (requestData) {
    if (festivalData) {
      const festivalsData = (festivalData.data.content || []).slice(0, 2);
      return <FestivalsSection title={title} data={festivalsData} highlight />;
    }
    return null;
  }
  // 캐시가 있으면 areaId와 동일한 최근 캐시 사용
  const cachedEntries = queryClient.getQueriesData<AxiosResponse<ApiResponseList<Festival>>>({
    queryKey: ['aiPick', Number(areaId)],
  });
  const cachedLatest = cachedEntries.at(-1)?.[1];
  if (cachedLatest) {
    const festivalsData = (cachedLatest.data.content || []).slice(0, 2);
    return <FestivalsSection title={title} data={festivalsData} highlight />;
  }

  return null;
};

export default FestivalsAISection;
