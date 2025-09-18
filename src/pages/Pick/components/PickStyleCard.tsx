const PickStyleCard = ({ image, title }: { image: string; title: string }) => {
  return (
    <div className="w-full h-full overflow-hidden flex flex-col items-center justify-center gap-3">
      <img src={image} alt={title} className="size-[100px] rounded-lg  object-cover bg-gray-200" />
      <p className="text-sm font-bold">{title}</p>
    </div>
  );
};

export default PickStyleCard;
