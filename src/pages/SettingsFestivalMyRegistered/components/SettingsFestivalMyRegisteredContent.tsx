import { useState, useEffect } from 'react';
import { getMyFestivals } from '@/apis/festivals/getMyFestivals';
import type { Festival } from '@/types/FestivalType';
import EmptyComponent from '@/components/common/EmptyComponent';
import FestivalCard from '@/pages/Festivals/components/FestivalCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

/**
 * 내가 등록한 축제 내용 컴포넌트
 * @returns 내가 등록한 축제 내용 컴포넌트
 * 내가 등록한 축제 목록을 표시합니다.
 */
const SettingsFestivalMyRegisteredContent = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

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

  const { ref: observerRef } = useIntersectionObserver(() => {
    fetchMore();
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
      <div className="grid grid-cols-2 gap-6 pb-20">
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
