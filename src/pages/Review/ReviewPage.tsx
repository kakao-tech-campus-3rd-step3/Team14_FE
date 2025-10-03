import Header from "@/components/common/Header";
import { generatePath, useLocation, useParams } from "react-router-dom";
import FestivalCard from "../Festivals/components/FestivalCard";
import Container from "@/components/common/Container";
import ReviewForm from "@/pages/Review/components/ReviewForm";
import StarRating from "@/pages/Review/components/StarRating";
import Footer from "@/components/common/Footer";
import { useAuth } from "@/context/AuthContext";
import { getFestivalInfo } from "@/apis/festivals/getFestivalInfo";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/common/Button";
import { ROUTE_PATH } from "@/constants/routes";
import useNav from "@/hooks/useNav";
import ErrorComponent from "@/components/common/ErrorComponent";
/**
 * 리뷰작성페이지
 * 기본적으로 앞선 상세페이지에서 넘어오는 축제 상세정보를 기반으로 리뷰를 작성하도록 구현하였습니다.
 * 다만, 사용자가 임의로 특정 숫자의 페이지에 접속할 경우에 대비해서 여러 에러 상황에 따라 분기 처리 해놓았습니다.
 * 기능 구현을 마친 후, 팀원과의 상의 후 에러바운더리에 의한 처리로 리팩토링할 예정입니다.
 * @returns 리뷰 작성 페이지
 */
const ReviewPage = () => {
    const { festivalId } = useParams();
    const {userInfo} = useAuth();
    const {festivalInfo} = useLocation().state || {};
    const {goTo} = useNav();
    // festivalId가 없으면 에러 처리
    if (!festivalId) {
      return (
        <Container>
          <Header variant="page" title="축제 리뷰 작성" />
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-red-500 text-center">
              <h2 className="text-xl font-semibold mb-2">잘못된 접근입니다</h2>
              <p className="mb-4">올바른 축제 ID가 필요합니다.</p>
              <Button 
                variant="primary" 
                onClick={() => goTo(generatePath(ROUTE_PATH.HOME))}
              >
                홈으로 돌아가
              </Button>
            </div>
          </div>
          <Footer />
        </Container>
      );
    }
    // festivalInfo가 없으면 API로 축제 존재 여부 확인
    const { data: festivalData, isPending, isError } = useQuery({
      queryKey: ['festival', festivalId],
      queryFn: () => getFestivalInfo({ festivalId: festivalId || '' }),
      select: (data) => data.data,
      enabled: !!festivalId && !festivalInfo, // festivalInfo가 없을 때만 실행
    });
    
    const currentFestivalInfo = festivalInfo || festivalData?.content;

    // 로딩 중 (festivalInfo가 없고 API 호출 중)
    if (!currentFestivalInfo && isPending) {
      return (
        <Container>
          <Header variant="page" title="축제 리뷰 작성" />
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-300"></div>
            <p className="mt-4 text-lg text-gray-600">축제 정보를 확인하는 중</p>
          </div>
          <Footer />
        </Container>
      );
    }
    // 축제가 존재하지 않거나 에러 발생
    if (!currentFestivalInfo && (isError || !isPending)) {
      return (
        <Container>
          <Header variant="page" title="축제 리뷰 작성" />
          <ErrorComponent title="존재하지 않는 축제입니다" message="요청하신 축제를 찾을 수 없습니다." />
          <Footer />
        </Container>
      );
    }
     // festivalInfo가 없으면 에러 처리
    if (!currentFestivalInfo) {
      return (
        <Container>
          <Header variant="page" title="축제 리뷰 작성" />
          <ErrorComponent title="잘못된 접근입니다" message="축제 상세페이지에서 접근해주세요." />
          <Footer />
        </Container>
      );
    }
    return (
      <Container>
        <Header variant="page" title="축제 리뷰 작성" />
        
        <div className="p-4 space-y-4">

          <FestivalCard data={currentFestivalInfo} />
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-3 text-center">이번 축제는 어떠셨나요?</h3>
            <StarRating />
          </div>
          
          <ReviewForm 
            festivalId={festivalId || ''}
            userInfo={userInfo || {email: '', username: '', profileImageUrl: ''}}
          />
        </div>
        <Footer />
      </Container>
    );
  };
export default ReviewPage;