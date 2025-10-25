import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";


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
  return (
    <Container>
      <Header variant="page" title="공지사항 작성" />

      <Footer />
    </Container>
  );
};

export default FestivalInfoNoticeCreatePage;