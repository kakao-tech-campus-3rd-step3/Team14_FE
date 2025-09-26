const FestivalContentDuration = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  return (
    <div className="w-full h-full flex items-center gap-2">
      <img src="/time.svg" alt="time" className="size-4" />
      <p className="text-sm text-gray-900">
        {startDate} ~ {endDate}
      </p>
    </div>
  );
};

export default FestivalContentDuration;
