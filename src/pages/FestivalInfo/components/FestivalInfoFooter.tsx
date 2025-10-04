import getFestivalInfo from '@/apis/festivals/getFestivalInfo';
import Button from '@/components/common/Button';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const FestivalInfoFooter = () => {
  const containerClasses = 'w-full mx-auto flex flex-col items-center fixed bottom-0 left-0 z-999';
  const baseClasses =
    'w-full max-w-[480px] h-15 border-t border-gray-300 flex items-center bg-white p-2 gap-2';
  const buttonClasses = 'flex-1 flex items-center justify-center h-full';
  const { festivalId } = useParams();
  const { data: festivalData } = useQuery({
    queryKey: ['festival', festivalId],
    queryFn: () => getFestivalInfo({ festivalId: festivalId || '' }),
    select: (data) => data.data,
    enabled: !!festivalId,
  });
  return (
    <div className={containerClasses}>
      <div className={baseClasses}>
        <Link
          to={`/review/${festivalId}`}
          state={{ festivalInfo: festivalData?.content }}
          className={buttonClasses}
        >
          <Button variant="secondary" size="sm" fullWidth className="h-full">
            리뷰하기
          </Button>
        </Link>
        <Link to="#" className={buttonClasses}>
          <Button variant="primary" size="sm" fullWidth className="h-full">
            채팅 참여하기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FestivalInfoFooter;
