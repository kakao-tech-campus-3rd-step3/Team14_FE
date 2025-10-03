import Header from "@/components/common/Header";
import { useLocation, useParams } from "react-router-dom";
import FestivalCard from "../Festivals/components/FestivalCard";
import Container from "@/components/common/Container";
import ReviewForm from "@/pages/Review/components/ReviewForm";
import StarRating from "@/pages/Review/components/StarRating";
import Footer from "@/components/common/Footer";

const ReviewPage = () => {
    const { festivalId } = useParams();
    const location = useLocation();
    const { festivalInfo, userInfo } = location.state;
    
    return (
      <Container>
        <Header variant="page" title="축제 리뷰 작성" />
        
        <div className="p-4 space-y-4">

          <FestivalCard data={festivalInfo} />
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-3 text-center">이번 축제는 어떠셨나요?</h3>
            <StarRating />
          </div>
          
          <ReviewForm 
            festivalId={festivalId || ''}
            userInfo={userInfo}
          />
        </div>
        <Footer />
      </Container>
    );
  };
export default ReviewPage;