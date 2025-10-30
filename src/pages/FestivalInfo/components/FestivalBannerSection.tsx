import FestivalHostInfo from '@/pages/FestivalInfo/components/FestivalHostInfo';
import FestivalWish from '@/pages/FestivalInfo/components/FestivalWish';

const FestivalBannerSection = ({ url, isMyWish }: { url: string; isMyWish: boolean }) => {
  return (
    <div className="w-full h-full flex justify-between">
      <FestivalHostInfo url={url} />
      <FestivalWish isMyWish={isMyWish} />
    </div>
  );
};

export default FestivalBannerSection;
