import PickStyleCard from '@/pages/Pick/components/PickStyleCard';
import PICK_STYLES from '@/constants/pickStyles';

const PickStyleList = () => {
  return (
    <div className="w-full h-full grid grid-cols-3 gap-4 gap-y-6">
      {PICK_STYLES.map((style) => (
        <PickStyleCard key={style.id} image={''} title={style.name} id={style.id} />
      ))}
    </div>
  );
};

export default PickStyleList;
