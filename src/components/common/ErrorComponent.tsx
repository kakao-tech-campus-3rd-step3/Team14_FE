import Button from '@/components/common/Button';
import useNav from '@/hooks/useNav';

interface ErrorComponentProps {
  title: string;
  message: string;
  showBackButton?: boolean;
}

const ErrorComponent = ({
  title,
  message,

  showBackButton = true,
}: ErrorComponentProps) => {
  const { goBack } = useNav();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-red-500 text-center">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="mb-4">{message}</p>
        {showBackButton && (
          <Button variant="primary" onClick={goBack}>
            이전 페이지로 돌아가기
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorComponent;
