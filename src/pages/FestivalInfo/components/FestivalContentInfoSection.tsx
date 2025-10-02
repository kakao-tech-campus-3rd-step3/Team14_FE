import type { FestivalInfo } from '@/types/FestivalType';
import FestivalContentTitle from '@/pages/FestivalInfo/components/FestivalContentTitle';
import FestivalContentDuration from '@/pages/FestivalInfo/components/FestivalContentDuration';
import FestivalContentAddress from '@/pages/FestivalInfo/components/FestivalContentAddress';
import FestivalContentStarAndReveiwCount from '@/pages/FestivalInfo/components/FestivalContentStarAndReveiwCount';
import type { Review } from '@/apis/review/getReview';

const FestivalContentInfoSection = ({
  content,
  reviewsData,
}: {
  content: FestivalInfo;
  reviewsData: Review[] | undefined;
}) => {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <FestivalContentTitle title={content.title} />
      <FestivalContentStarAndReveiwCount reviewsData={reviewsData} />
      <FestivalContentDuration startDate={content.startDate} endDate={content.endDate} />
      <FestivalContentAddress address1={content.addr1} address2={content.addr2} />
    </div>
  );
};

export default FestivalContentInfoSection;
