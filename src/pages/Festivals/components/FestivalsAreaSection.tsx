import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import getFestivals from '@/apis/festivals/getFestivals';
import FestivalsSection from '@/pages/Festivals/components/FestivalsSection';
import { useParams } from 'react-router-dom';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import EmptyComponent from '@/components/common/EmptyComponent';
import MAP_PINS from '@/constants/mapPins';

const FestivalsAreaSection = () => {
  const { areaId } = useParams();

  const { data, isFetching, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['festivals', areaId],
    queryFn: ({ pageParam = 0 }) =>
      getFestivals({ areaId: areaId || '', size: 6, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.last ? undefined : allPages.length;
    },
    initialPageParam: 0,
  });

  const { ref: observerRef } = useIntersectionObserver(() => {
    if (isFetching || !hasNextPage) return;
    fetchNextPage();
  });

  const festivals = data?.pages.flatMap((page) => page.data.content) || [];

  const area = MAP_PINS.find((pin) => pin.areaId === areaId);
  const areaName = area?.name ?? '지역';

  if (festivals.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src="/lost404.svg" alt="no festivals" className="w-64 h-64 mt-12 drop-shadow-lg" />
        <EmptyComponent
          title="해당 지역의 축제가 없습니다."
          description="다른 지역의 축제를 찾아보세요!"
        />
      </div>
    );
  }
  return (
    <div>
      <FestivalsSection title={`${areaName}의 축제`} data={festivals} />
      {hasNextPage && <div ref={observerRef} className="h-1" />}
      {isFetching && <LoadingSpinner className="mt-8" />}
    </div>
  );
};

export default FestivalsAreaSection;
