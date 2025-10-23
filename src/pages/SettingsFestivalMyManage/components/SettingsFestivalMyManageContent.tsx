import { useState, useEffect, useRef, type RefObject } from 'react';
import { getMyFestivalPermissions } from '@/apis/festivalManager/getMyFestivalPermissions';
import type { FestivalPermissionItem } from '@/apis/festivalManager/getMyFestivalPermissions';
import EmptyComponent from '@/components/common/EmptyComponent';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import useInfiniteScrolling from '@/hooks/useInfiniteScrolling';
import FestivalPermissionCard from '@/pages/SettingsFestivalMyManage/components/FestivalPermissionCard';

/**
 * 축제 관리자 신청 내역 컴포넌트
 * @returns 축제 관리자 신청 내역 컴포넌트
 * 축제 관리자 신청 내역을 표시합니다.
 */
const SettingsFestivalMyManageContent = () => {
  const [permissions, setPermissions] = useState<FestivalPermissionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadPermissions = async (page: number) => {
    try {
      setLoading(true);
      const response = await getMyFestivalPermissions(page, 10);
      const newPermissions = response.data.content || [];

      if (page === 0) {
        setPermissions(newPermissions);
      } else {
        setPermissions((prev) => [...prev, ...newPermissions]);
      }

      setHasMore(!response.data.last);
    } catch (err) {
      console.error('신청 내역을 가져오는데 실패했습니다:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPermissions(0);
  }, []);

  const fetchMore = () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadPermissions(nextPage);
    }
  };

  useInfiniteScrolling({
    observerRef: observerRef as RefObject<HTMLDivElement>,
    fetchMore,
    hasMore,
  });

  if (loading && permissions.length === 0) {
    return (
      <LoadingSpinner size="lg" className="min-h-[400px]" message="신청 내역을 불러오는 중..." />
    );
  }

  if (permissions.length === 0) {
    return (
      <div className="p-4">
        <EmptyComponent
          title="신청한 축제가 없습니다"
          description="축제 상세 페이지에서 관리 신청을 해보세요!"
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-3 pb-20">
        {permissions.map((permission) => (
          <FestivalPermissionCard key={permission.id} permission={permission} />
        ))}
      </div>

      {loading && <LoadingSpinner size="md" className="h-64" message="불러오는 중..." />}
      {hasMore && <div ref={observerRef} className="h-10" />}
    </div>
  );
};

export default SettingsFestivalMyManageContent;
