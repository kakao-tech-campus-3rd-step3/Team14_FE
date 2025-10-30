import FestivalHostInfo from '@/pages/FestivalInfo/components/FestivalHostInfo';
import FestivalWish from '@/pages/FestivalInfo/components/FestivalWish';

const FestivalBannerSection = ({
  url,
  isMyWish,
  wishCount,
}: {
  url: string;
  isMyWish: boolean;
  wishCount: number;
}) => {
  return (
    <div className="w-full h-full flex justify-between">
      <FestivalHostInfo url={url} />
      <FestivalWish isMyWish={isMyWish} wishCount={wishCount} />
    </div>
  );
};

export default FestivalBannerSection;
