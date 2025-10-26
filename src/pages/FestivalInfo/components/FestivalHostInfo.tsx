import Button from '@/components/common/Button';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import { showToastErrorMessage } from '@/utils/showToastMessage';

const FestivalHostInfo = ({ url }: { url: string }) => {
  const goToPage = () => {
    if (url === 'no_homepage') return;
    try {
      new URL(url);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      showToastErrorMessage(SYSTEM_MESSAGES.DEFAULT_ERROR_MESSAGES.URL_INVALID);
    }
  };
  return (
    <Button variant="link" onClick={goToPage} className="text-gray-900">
      {url === 'no_homepage' ? null : '축제 홈페이지 바로가기'}
    </Button>
  );
};

export default FestivalHostInfo;
