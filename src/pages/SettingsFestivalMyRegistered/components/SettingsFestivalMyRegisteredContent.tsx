import { useState, useEffect, useRef, type RefObject } from 'react';
import { getMyFestivals } from '@/apis/festivals/getMyFestivals';
import type { Festival } from '@/types/FestivalType';
import EmptyComponent from '@/components/common/EmptyComponent';
import FestivalCard from '@/pages/Festivals/components/FestivalCard';
import useInfiniteScrolling from '@/hooks/useInfiniteScrolling';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const SettingsFestivalMyRegisteredContent = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadFestivals = async (page: number) => {
    try {
      setLoading(true);
      const response = await getMyFestivals(page, 5);
      const newFestivals = response.data.content || [];

      if (page === 0) {
        setFestivals(newFestivals);
      } else {
        setFestivals((prev) => [...prev, ...newFestivals]);
      }

      setHasMore(!response.data.last);
    } catch (err) {
      console.error('축제를 가져오는데 실패했습니다:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFestivals(0);
  }, []);

  const fetchMore = () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadFestivals(nextPage);
    }
  };

  useInfiniteScrolling({
    observerRef: observerRef as RefObject<HTMLDivElement>,
    fetchMore,
    hasMore,
  });

  if (loading && festivals.length === 0) {
    return <LoadingSpinner size="md" className="h-64" message="축제를 불러오는 중..." />;
  }

  if (festivals.length === 0) {
    return (
      <div className="p-4">
        <EmptyComponent title="등록한 축제가 없습니다." description="새로운 축제를 등록해보세요!" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-20">
        {festivals.map((festival) => (
          <FestivalCard key={festival.id} data={festival} />
        ))}
      </div>

      {loading && <LoadingSpinner size="md" className="h-64" message="축제를 불러오는 중..." />}
      {hasMore && <div ref={observerRef} className="h-10" />}
    </div>
  );
};

export default SettingsFestivalMyRegisteredContent;
