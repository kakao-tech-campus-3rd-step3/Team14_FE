import Button from '@/components/common/Button';
import { usePick } from '@/context/PickContext';

interface PickMBTICardProps {
  id: string;
  title: string;
  option1: string;
  option2: string;
}

const PickMBTICard = ({ id, title, option1, option2 }: PickMBTICardProps) => {
  const { mbtiAnswers, handleMbtiAnswer } = usePick();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <p className="text-lg text-left w-full">{title}</p>
      <div className="flex items-center justify-center gap-4 w-full">
        <Button
          variant={mbtiAnswers[id] === true ? 'primary' : 'tertiary'}
          className="flex-1 font-bold"
          fullWidth
          onClick={() => handleMbtiAnswer(id, true)}
        >
          {option1}
        </Button>
        <Button
          variant={mbtiAnswers[id] === false ? 'primary' : 'tertiary'}
          className="flex-1 font-bold"
          fullWidth
          onClick={() => handleMbtiAnswer(id, false)}
        >
          {option2}
        </Button>
      </div>
    </div>
  );
};

export default PickMBTICard;
