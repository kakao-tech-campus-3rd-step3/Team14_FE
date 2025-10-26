import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import ErrorComponent from '@/components/common/ErrorComponent';
import EmptyComponent from '@/components/common/EmptyComponent';
import { getFestivalNotices } from '@/apis/notice/getFestivalNotices';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useAuth } from '@/context/AuthContext';
import getFestivalInfo from '@/apis/festivals/getFestivalInfo';
import FestivalInfoNoticeListInfoCard from '@/pages/FestivalInfoNoticeList/components/FestivalInfoNoticeListInfoCard';
import { deleteFestivalNotice } from '@/apis/notice/deleteFestivalNotice';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { FestivalInfoNoticeCard } from './components/FestivalInfoNoticeCard';
import { useDeleteWithConfirm } from '@/hooks/useDeleteWithConfirm';
import { useNoticeNavigationHandlers } from '@/hooks/useNoticeNavigationHandlers';

const FestivalInfoNoticeListPage = () => {
  const { festivalId } = useParams();
  const location = useLocation();
  const focusNoticeId = location.state?.focusNoticeId;
  const noticeRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const { userInfo } = useAuth();

  const {
    isConfirmOpen,
    selectedId,
    isDeleting,
    handleDelete,
    handleConfirmDelete,
    setIsConfirmOpen,
    setSelectedId,
  } = useDeleteWithConfirm(
    async (noticeId: number) => {
      await deleteFestivalNotice(noticeId.toString());
    },
    ['festival-notices', festivalId || ''],
    '공지사항이 삭제되었습니다.',
    '공지사항 삭제에 실패했습니다.',
  );

  // 축제 정보 조회
  const { data: festivalData } = useQuery({
    queryKey: ['festival', festivalId],
    queryFn: () => getFestivalInfo({ festivalId: festivalId || '' }),
    select: (data) => data.data,
  });

  // API 호출
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: ['festival-notices', festivalId],
      queryFn: ({ pageParam = 0 }) => getFestivalNotices(festivalId || '', pageParam, 10),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.last ? undefined : allPages.length;
      },
      initialPageParam: 0,
      select: (data) => ({
        pages: data.pages,
        pageParams: data.pageParams,
      }),
    });
  // 관리자인지 확인
  const isCurrentUserManager = userInfo?.userId === festivalData?.content?.managerId;

  const { handleCreateNotice, handleEditNotice } = useNoticeNavigationHandlers(festivalId || '');

  // 무한 스크롤
  const { ref: observerRef } = useIntersectionObserver(() => {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  });

  const notices = data?.pages.flatMap((page) => page.data.content) || [];

  // 포커싱할 공지사항이 있으면 스크롤
  useEffect(() => {
    if (focusNoticeId && noticeRefs.current[focusNoticeId]) {
      setTimeout(() => {
        noticeRefs.current[focusNoticeId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        // 포커싱 효과 추가
        noticeRefs.current[focusNoticeId]?.classList.add(
          'ring-2',
          'ring-primary-300',
          'ring-opacity-50',
        );
        setTimeout(() => {
          noticeRefs.current[focusNoticeId]?.classList.remove(
            'ring-2',
            'ring-primary-300',
            'ring-opacity-50',
          );
        }, 3000);
      }, 100);
    }
  }, [focusNoticeId]);

  // 로딩 상태
  if (isLoading) {
    return (
      <Container>
        <Header variant="page" title="공지사항" />
        <LoadingSpinner size="lg" className="min-h-[400px]" message="공지사항을 불러오는 중..." />
        <Footer />
      </Container>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <Container>
        <Header variant="page" title="공지사항" />
        <ErrorComponent title="오류가 발생했습니다" message={error.message} showBackButton={true} />
        <Footer />
      </Container>
    );
  }

  // 공지사항이 없을 때
  if (notices.length === 0) {
    return (
      <Container>
        <Header variant="page" title="공지사항" />
        <EmptyComponent
          title="공지사항이 없습니다"
          description="아직 등록된 공지사항이 없습니다."
        />
        <Footer />
      </Container>
    );
  }

  return (
    <Container>
      <Header
        variant="page"
        title={
          festivalData?.content?.title && festivalData.content.title.length > 10
            ? `${festivalData.content.title.slice(0, 16)}...`
            : festivalData?.content?.title || '공지사항'
        }
      />
      <div className="p-4 space-y-4">
        {festivalData?.content && (
          <FestivalInfoNoticeListInfoCard
            festivalData={festivalData.content}
            title="지금 보고 있는 축제"
            showCreateButton={isCurrentUserManager}
            onCreateNotice={handleCreateNotice}
          />
        )}

        {/* 공지사항 목록 */}
        {notices.map((notice) => (
          <FestivalInfoNoticeCard
            key={notice.id}
            notice={notice}
            noticeRefs={noticeRefs}
            focusNoticeId={focusNoticeId}
            isCurrentUserManager={isCurrentUserManager}
            handleEditNotice={handleEditNotice}
            handleDeleteNotice={handleDelete}
            isDeleting={isDeleting}
          />
        ))}

        {/* 무한 스크롤 로딩 */}
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <LoadingSpinner size="sm" message="더 많은 공지사항을 불러오는 중..." />
          </div>
        )}
        <div ref={observerRef} />
      </div>
      <Footer />

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setSelectedId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="공지사항 삭제"
        message="정말로 이 공지사항을 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
      />
    </Container>
  );
};

export default FestivalInfoNoticeListPage;
