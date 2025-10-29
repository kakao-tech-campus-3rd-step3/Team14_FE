import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import ErrorComponent from '@/components/error/ErrorComponent';
import Footer from '@/components/common/Footer';
import type { HeaderProps } from '@/components/common/Header';

interface ErrorPageProps {
  title?: string;
  message?: string;
  variant: HeaderProps['variant'];
}

/**
 * 에러 페이지
 * @param title - 에러 페이지 제목
 * @param message - 에러 페이지 메시지
 * @param variant - 에러 페이지 변형 타입
 * @returns 에러 페이지
 */
const ErrorPage = ({ title, message, variant }: ErrorPageProps) => {
  return (
    <Container>
      <Header variant={variant} title={title} />
      <ErrorComponent title={title} message={message} />
      <Footer />
    </Container>
  );
};

export default ErrorPage;
