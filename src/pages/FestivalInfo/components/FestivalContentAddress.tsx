const FestivalContentAddress = ({ address1, address2 }: { address1: string; address2: string }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-start gap-2">
        <img src="/location.svg" alt="location" className="size-4 shrink-0" />
        <p className="text-sm text-gray-900 break-all whitespace-pre-wrap min-w-0">{address1}</p>
      </div>
      {address2 && (
        <span className="block text-sm text-gray-900 ml-6 break-all whitespace-pre-wrap min-w-0">
          {address2}
        </span>
      )}
    </div>
  );
};

export default FestivalContentAddress;
