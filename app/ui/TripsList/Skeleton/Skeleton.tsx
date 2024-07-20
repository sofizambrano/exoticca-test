import TripCardSkeleton from '../TripCard/Skeleton/Skeleton';

export function TripsListSkeleton() {
  return (
    <div className="flex flex-col items-stretch gap-6">
      <TripCardSkeleton />
      <TripCardSkeleton />
      <TripCardSkeleton />
      <TripCardSkeleton />
    </div>
  );
}
