import { ROUTE_PATH } from '@/constants/routes';
import useNav from '@/hooks/useNav';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

/**
 * 404 Not Found 페이지
 * 존재하지 않는 페이지에 접근 시 표시되는 페이지
 * @returns 404 Not Found 페이지
 */
const NotFoundPage = () => {
  const { goTo } = useNav();

  return (
    <Container>
      <Header variant="page" />
      <div className="flex flex-col items-center justify-center text-center h-[calc(100dvh-110px)]">
        <img
          src="lost404.svg"
          alt="길을 잃은 픽이 그림"
          className="w-64 h-64 mb-6 animate-bounce-slow drop-shadow-lg"
        />

        <h1 className="text-3xl font-bold text-slate-700 mb-2">길을 잃었어요!</h1>
        <p className="text-slate-500 mb-8">찾고 계신 페이지가 존재하지 않습니다.</p>

        <Button variant="primary" onClick={() => goTo(ROUTE_PATH.HOME)}>
          홈으로 돌아가기
        </Button>
      </div>
      <Footer initialSelected="none" />
    </Container>
  );
};

export default NotFoundPage;
