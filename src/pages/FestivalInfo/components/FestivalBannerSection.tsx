import FestivalHostInfo from '@/pages/FestivalInfo/components/FestivalHostInfo';
import FestivalWish from '@/pages/FestivalInfo/components/FestivalWish';

const FestivalBannerSection = ({ url }: { url: string }) => {
  return (
    <div className="w-full h-full flex justify-between">
      <FestivalHostInfo url={url} />
      <FestivalWish />
    </div>
  );
};

export default FestivalBannerSection;
