import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { getFestivalInfo } from '@/apis/festivals/getFestivalInfo';
import { useAuth } from '@/context/AuthContext';
import FestivalInfoNoticeEditForm from '@/pages/FestivalInfoNoticeEdit/components/FestivalInfoNoticeEditForm';
import type { Notice } from '@/types/Notice';
import ErrorPage from '@/components/error/ErrorPage';
import LoadingPage from '@/components/loading/LoadingPage';

/**
 * 공지사항 수정 페이지
 * @returns 공지사항 수정 페이지
 */
const FestivalInfoNoticeEditPage = () => {
  const { festivalId, noticeId } = useParams();
  const location = useLocation();
  const { userInfo } = useAuth();

  const noticeData = location.state?.noticeData as Notice;

  // 축제 정보 조회
  const { data: festivalData, isLoading } = useQuery({
    queryKey: ['festival', festivalId],
    queryFn: () => getFestivalInfo({ festivalId: festivalId || '' }),
    select: (data) => data.data,
  });

  if (isLoading) {
    return (
      <LoadingPage title="공지사항 수정" message="축제 정보를 불러오는 중..." variant="page" />
    );
  }

  // 권한 확인
  const isCurrentUserManager = userInfo?.userId === festivalData?.content?.managerId;
  if (!isCurrentUserManager) {
    return (
      <ErrorPage
        title="공지사항 수정"
        message="관리자만 공지사항을 수정할 수 있습니다."
        variant="page"
      />
    );
  }

  if (!festivalData?.content || !noticeData) {
    return (
      <ErrorPage
        title="공지사항 수정"
        message="축제 또는 공지사항 정보를 찾을 수 없습니다."
        variant="page"
      />
    );
  }

  return (
    <Container>
      <Header variant="page" title="공지사항 수정" />
      <FestivalInfoNoticeEditForm
        festivalData={festivalData.content}
        noticeData={noticeData}
        noticeId={noticeId!}
      />
      <Footer />
    </Container>
  );
};

export default FestivalInfoNoticeEditPage;
