import { TripCardSkeleton } from './TripCard/TripCardSkeleton';
import styles from './TripsList.module.css';

export function TripsListSkeleton() {
  return (
    <div className={styles.container}>
      <TripCardSkeleton />
      <TripCardSkeleton />
      <TripCardSkeleton />
      <TripCardSkeleton />
    </div>
  );
}
