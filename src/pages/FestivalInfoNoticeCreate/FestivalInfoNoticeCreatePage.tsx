import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import FestivalInfoNoticeForm from '@/pages/FestivalInfoNoticeCreate/components/FestivalInfoNoticeForm';
import { useAuth } from '@/context/AuthContext';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import getFestivalInfo from '@/apis/festivals/getFestivalInfo';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import ErrorComponent from '@/components/common/ErrorComponent';

/**
 * 공지사항 작성 페이지
 * 공지사항을 작성하는 페이지입니다.
 * URL 입력을 통한 올바르지 않은 접속을 차단하기 위해 검증 로직을 한번 더 거칩니다.
 * 축제 정보의 managerId와 현재 로그인한 사용자의 userId를 비교하여 관리자인지 확인합니다.
 * 관리자인 경우 공지사항 작성 폼을 표시합니다.
 * 관리자가 아닌 경우 공지사항 작성 폼을 표시않고 에러 메시지를 표시합니다.
 * @returns 공지사항 작성 페이지
 */
const FestivalInfoNoticeCreatePage = () => {
  // 축제의 managerId와 현재 로그인한 사용자의 userId를 비교하여 관리자인지 확인합니다.
  const { festivalId } = useParams();
  const { userInfo } = useAuth();

  const { data: festivalData, isLoading } = useQuery({
    queryKey: ['festival', festivalId],
    queryFn: () => getFestivalInfo({ festivalId: festivalId || '' }),
    select: (data) => data.data,
  });

  if (isLoading) {
    return (
      <Container>
        <Header variant="page" title="공지사항 작성" />
        <LoadingSpinner size="lg" message="축제 정보를 불러오는 중..." />
        <Footer />
      </Container>
    );
  }
  if (!festivalData) {
    return (
      <Container>
        <Header variant="page" title="공지사항 작성" />
        <ErrorComponent title="오류" message="축제 정보를 불러오지 못했습니다." />
        <Footer />
      </Container>
    );
  }
  const isCurrentUserManager = userInfo?.userId === festivalData?.content.managerId;

  if (!isCurrentUserManager) {
    return (
      <Container>
        <Header variant="page" title="공지사항 작성" />
        <ErrorComponent
          title="관리자가 아닙니다."
          message="관리자만 공지사항을 작성할 수 있습니다."
        />
        <Footer />
      </Container>
    );
  }

  return (
    <Container>
      <Header variant="page" title="공지사항 작성" />
      <FestivalInfoNoticeForm festivalData={festivalData?.content} />
      <Footer />
    </Container>
  );
};

export default FestivalInfoNoticeCreatePage;
