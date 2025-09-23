import { usePick } from '@/contexts/PickContext';

interface PickStyleCardProps {
  image: string;
  title: string;
  id: string;
}

const PickStyleCard = ({ image, title, id }: PickStyleCardProps) => {
  const selectedCardClasses = 'border-3 border-primary-300';
  const { selectedStyles, handleStyleSelect } = usePick();
  const isSelected = selectedStyles.includes(id);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      onClick={() => handleStyleSelect(id)}
    >
      <img
        src={image}
        alt={title}
        className={`size-[100px] rounded-lg ${isSelected ? selectedCardClasses : ''} object-cover bg-transparent border-2 border-gray-900`}
      />
      <p className={`text-lg ${isSelected ? 'font-bold' : ''}`}>{title}</p>
    </div>
  );
};

export default PickStyleCard;
