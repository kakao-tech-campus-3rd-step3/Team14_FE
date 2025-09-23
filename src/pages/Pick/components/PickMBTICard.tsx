import Button from '@/components/common/Button';
import { usePick } from '@/context/PickContext';

interface PickMBTICardProps {
  title: string;
  option1: string;
  option2: string;
}

const PickMBTICard = ({ title, option1, option2 }: PickMBTICardProps) => {
  const { mbtiAnswers, handleMbtiAnswer } = usePick();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <p className="text-lg text-left w-full">{title}</p>
      <div className="flex items-center justify-center gap-4 w-full">
        <Button
          variant={mbtiAnswers[title] === option1 ? 'primary' : 'tertiary'}
          className="flex-1 font-bold"
          fullWidth
          onClick={() => handleMbtiAnswer(title, option1)}
        >
          {option1}
        </Button>
        <Button
          variant={mbtiAnswers[title] === option2 ? 'primary' : 'tertiary'}
          className="flex-1 font-bold"
          fullWidth
          onClick={() => handleMbtiAnswer(title, option2)}
        >
          {option2}
        </Button>
      </div>
    </div>
  );
};

export default PickMBTICard;
