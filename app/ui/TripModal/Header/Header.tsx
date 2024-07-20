import { Trip } from '@/types/Trip';
import styles from './Header.module.css';
import { useTripsStore } from '@/stores/tripsStore';

export default function Header(
  trip: Pick<Trip, 'id' | 'title' | 'status'>
): JSX.Element {
  const { updateTrip } = useTripsStore();

  const statusIcon = (
    <img
      className={styles.statusIcon}
      src={trip.status === 'done' ? '/checked.png' : 'unchecked.png'}
      width="24px"
      height="24px"
      alt={`${trip.title} trip ${trip.status}`}
    />
  );

  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{trip.title}</h3>

      {trip.status === 'done' ? (
        <div className={styles.statusWrapper}>
          {statusIcon}
          <p className={styles.label}>Complete</p>
        </div>
      ) : (
        <button
          type="button"
          className={styles.statusWrapper}
          onClick={() => updateTrip(trip.id, { status: 'done' })}
        >
          {statusIcon}
          <p className={styles.label}>Mark as completed</p>
        </button>
      )}
    </div>
  );
}
