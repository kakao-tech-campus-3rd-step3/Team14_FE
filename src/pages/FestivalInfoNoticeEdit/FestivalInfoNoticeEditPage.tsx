import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import ErrorComponent from '@/components/common/ErrorComponent';
import { getFestivalInfo } from '@/apis/festivals/getFestivalInfo';
import { useAuth } from '@/context/AuthContext';
import FestivalInfoNoticeEditForm from '@/pages/FestivalInfoNoticeEdit/components/FestivalInfoNoticeEditForm';
import type { Notice } from '@/types/Notice';

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
      <Container>
        <Header variant="page" title="공지사항 수정" />
        <LoadingSpinner size="lg" className="min-h-[400px]" message="축제 정보를 불러오는 중..." />
        <Footer />
      </Container>
    );
  }

  // 권한 확인
  const isCurrentUserManager = userInfo?.userId === festivalData?.content?.managerId;
  if (!isCurrentUserManager) {
    return (
      <Container>
        <Header variant="page" title="공지사항 수정" />
        <ErrorComponent
          title="권한이 없습니다"
          message="관리자만 공지사항을 수정할 수 있습니다."
          showBackButton={true}
        />
        <Footer />
      </Container>
    );
  }

  if (!festivalData?.content || !noticeData) {
    return (
      <Container>
        <Header variant="page" title="공지사항 수정" />
        <ErrorComponent
          title="데이터를 찾을 수 없습니다"
          message="축제 또는 공지사항 정보를 찾을 수 없습니다."
          showBackButton={true}
        />
        <Footer />
      </Container>
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
