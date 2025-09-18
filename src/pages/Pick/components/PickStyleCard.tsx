import { useSearchParams } from 'react-router-dom';

interface PickStyleCardProps {
  image: string;
  title: string;
  id: string;
}

const PickStyleCard = ({ image, title, id }: PickStyleCardProps) => {
  const [, setSearchParams] = useSearchParams();
  return (
    <div
      className="w-full h-full overflow-hidden flex flex-col items-center justify-center gap-3"
      onClick={() => setSearchParams({ style: id })}
    >
      <img src={image} alt={title} className="size-[100px] rounded-lg  object-cover bg-gray-200" />
      <p className="text-lg">{title}</p>
    </div>
  );
};

export default PickStyleCard;
