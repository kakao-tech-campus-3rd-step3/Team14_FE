import LoadingSpinner from '@/components/loading/LoadingSpinner';
import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import type { HeaderProps } from '@/components/common/Header';

interface LoadingPageProps {
  title?: string;
  message?: string;
  variant: HeaderProps['variant'];
}

/**
 * 로딩 페이지
 * @param title - 로딩 페이지 제목
 * @param message - 로딩 페이지 메시지
 * @param variant - 로딩 페이지 변형 타입
 * @returns 로딩 페이지
 */
const LoadingPage = ({ title, message, variant }: LoadingPageProps) => {
  return (
    <Container>
      <Header variant={variant} title={title} />
      <LoadingSpinner size="lg" className="h-[calc(100dvh-110px)]" message={message} />
      <Footer />
    </Container>
  );
};

export default LoadingPage;
