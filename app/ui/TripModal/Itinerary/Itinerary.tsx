import { Trip } from '@/types/Trip';
import styles from './Itinerary.module.css';

export default function Itinerary(trip: Pick<Trip, 'itinerary'>): JSX.Element {
  return (
    <div>
      {trip.itinerary.map((item) => (
        <div key={item.day} className={styles.item}>
          <div className={styles.lines}>
            <div className={styles.dot}></div>
            <div className={styles.line}></div>
          </div>
          <div className={styles.content}>
            <h5 className={styles.title}>
              Day {item.day}: {item.location}
            </h5>
            <p className={styles.description}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
