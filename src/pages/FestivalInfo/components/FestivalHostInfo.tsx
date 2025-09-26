import Button from '@/components/common/Button';

const FestivalHostInfo = ({ url }: { url: string }) => {
  const goToPage = () => {
    if (url === 'no_homepage') return;
    try {
      new URL(url);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      alert('유효하지 않은 URL입니다.');
    }
  };
  return (
    <Button variant="link" onClick={goToPage} className="text-gray-900">
      {url === 'no_homepage' ? null : '축제 홈페이지 바로가기'}
    </Button>
  );
};

export default FestivalHostInfo;
