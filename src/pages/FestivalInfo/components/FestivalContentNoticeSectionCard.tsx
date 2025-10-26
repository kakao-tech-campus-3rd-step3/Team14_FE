import type { Notice } from '@/types/Notice';

interface FestivalContentNoticeSectionCardProps {
  notice: Notice;
}

const FestivalContentNoticeSectionCard = ({ notice }: FestivalContentNoticeSectionCardProps) => {
  return (
    <div className="p-3 border border-gray-200 rounded-lg flex items-center h-full bg-white shadow-sm">
      <p className="font-medium text-gray-900 text-lg line-clamp-2 w-full text-center">
        {notice.title}
      </p>
    </div>
  );
};

export default FestivalContentNoticeSectionCard;
