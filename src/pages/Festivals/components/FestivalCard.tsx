import type { Festival } from '@/types/FestivalType';

interface FestivalCardProps {
  data: Festival;
}

const FestivalCard = ({ data }: FestivalCardProps) => {
  return (
    <div
      className={`w-full bg-white h-[150px] flex items-center rounded-xl overflow-hidden drop-shadow-xl gap-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]`}
    >
      <img
        src={data.imageUrl}
        alt={data.title + ' image'}
        className="w-[200px] h-full object-cover"
      />
      <div className="h-full flex flex-col justify-between py-4 px-8">
        <h3 className="text-xl font-bold">{data.title}</h3>
        <p className="text-sm">
          {data.startDate} ~ {data.endDate}
        </p>
        <p className="text-sm">{data.addr1}</p>
      </div>
    </div>
  );
};

export default FestivalCard;
