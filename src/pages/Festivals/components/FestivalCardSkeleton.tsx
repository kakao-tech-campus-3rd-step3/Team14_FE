import Skeleton from '@/components/skeleton/Skeleton';

/** 축제 카드 스켈레톤 */
export const FestivalCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg">
    <div className="aspect-[3/2] w-full">
      <Skeleton className="w-full h-full" variant="rectangular" />
    </div>

    <div className="p-4 space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" variant="rectangular" />
        <Skeleton className="h-5 w-3/4" variant="rectangular" />
      </div>

      <div className="space-y-1">
        <Skeleton className="h-4 w-2/3" variant="rectangular" />
        <Skeleton className="h-4 w-1/2" variant="rectangular" />
      </div>
    </div>
  </div>
);

/** 축제 섹션 스켈레톤 (여러 카드) */
export const FestivalsSectionSkeleton = ({ count = 6 }: { count?: number }) => (
  <section className="w-full">
    <div className="mb-6">
      <Skeleton className="h-8 w-32" variant="rectangular" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <FestivalCardSkeleton key={index} />
      ))}
    </div>
  </section>
);

export default Skeleton;
