const FestivalContentAddress = ({ address1, address2 }: { address1: string; address2: string }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-2">
        <img src="/location.svg" alt="location" className="size-4" />
        <p className="text-sm text-gray-900">{address1}</p>
      </div>
      {address2 && <span className="text-sm text-gray-900 ml-6">{address2}</span>}
    </div>
  );
};

export default FestivalContentAddress;
