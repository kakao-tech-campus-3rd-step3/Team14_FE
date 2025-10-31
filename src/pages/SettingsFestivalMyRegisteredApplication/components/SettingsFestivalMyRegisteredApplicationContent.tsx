import { useState, useEffect } from 'react';
import { getMyCustomFestivals } from '@/apis/festivals/getMyCustomFestivals';
import type { FestivalRegistrationApplication } from '@/types/FestivalFormTypes';
import EmptyComponent from '@/components/common/EmptyComponent';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import SettingsFestivalMyRegisteredApplicationCard from '@/pages/SettingsFestivalMyRegisteredApplication/components/SettingsFestivalMyRegisteredApplicationCard';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

/**
 * 내가 등록 신청한 축제 내용 컴포넌트
 * @returns 내가 등록 신청한 축제 내용 컴포넌트
 * 내가 등록 신청한 축제 목록을 표시합니다.
 */
const SettingsFestivalMyRegisteredApplicationContent = () => {
  const [applications, setApplications] = useState<FestivalRegistrationApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const loadApplications = async (page: number) => {
    try {
      setLoading(true);
      const response = await getMyCustomFestivals(page, 10);
      const newApplications = response.data.content || [];

      if (page === 0) {
        setApplications(newApplications);
      } else {
        setApplications((prev) => [...prev, ...newApplications]);
      }

      setHasMore(!response.data.last);
    } catch (err) {
      console.error('축제 등록 신청 내역을 가져오는데 실패했습니다:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications(0);
  }, []);

  const fetchMore = () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadApplications(nextPage);
    }
  };

  const { ref: observerRef } = useIntersectionObserver(() => {
    if (loading || !hasMore) return;
    fetchMore();
  });

  if (loading && applications.length === 0) {
    return (
      <LoadingSpinner size="lg" className="min-h-[400px]" message="신청 내역을 불러오는 중..." />
    );
  }

  if (applications.length === 0) {
    return (
      <div className="p-4">
        <EmptyComponent
          title="등록 신청한 축제가 없습니다"
          description="새로운 축제를 등록해보세요!"
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-3 pb-20">
        {applications.map((application) => (
          <SettingsFestivalMyRegisteredApplicationCard
            key={application.id}
            application={application}
          />
        ))}
      </div>

      {loading && <LoadingSpinner size="md" className="h-64" message="불러오는 중..." />}
      {hasMore && <div ref={observerRef} className="h-10" />}
    </div>
  );
};

export default SettingsFestivalMyRegisteredApplicationContent;
