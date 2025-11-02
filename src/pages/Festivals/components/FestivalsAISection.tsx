import FestivalsSection from '@/pages/Festivals/components/FestivalsSection';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import postFestivalsPick, { type PostFestivalsPickBody } from '@/apis/festivals/postFestivalsPick';
import { useEffect } from 'react';

const FestivalsAISection = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  // API 호출을 위한 mutation
  const {
    mutate: mutateFestivalPick,
    isPending,
    data: festivalData,
  } = useMutation({
    mutationFn: (requestData: PostFestivalsPickBody) => postFestivalsPick({ requestData }),
    onError: (error) => {
      console.error(error);
    },
  });

  // requestData가 있으면 API 호출
  useEffect(() => {
    if (requestData && !isPending) {
      mutateFestivalPick(requestData);
    }
  }, [requestData, isPending, mutateFestivalPick]);

  // mutation 성공 데이터가 있으면 사용
  if (festivalData) {
    const title = '맞춤 AI Pick 축제';
    const festivalsData = (festivalData.data?.content|| []).slice(0,2);
    return <FestivalsSection title={title} data={festivalsData} highlight />;
  }

  return null;
};

export default FestivalsAISection;
