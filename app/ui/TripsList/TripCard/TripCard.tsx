import styles from './TripCard.module.css';
import { useTripModalStore } from '@/stores/tripModalStore';
import { useTripsStore } from '@/stores/tripsStore';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Trip } from '@/types/Trip';
import { useEditTripModalStore } from '@/stores/editTripModalStore';

export default function TripCard(trip: Trip): JSX.Element {
  const { deleteTrip, updateTrip } = useTripsStore();
  const { openModal: openTripModal } = useTripModalStore();
  const { openModal: openEditTripModal } = useEditTripModalStore();
  const searchParams = useSearchParams();
  const [completedTabIsActive, setCompletedTabIsActive] =
    useState<boolean>(false);

  useEffect(() => {
    const status = searchParams.get('status');
    setCompletedTabIsActive(status === 'done');
  }, [searchParams, trip]);

  const repeatButton = (
    <button
      type="button"
      className={styles.repeatButton}
      onClick={() => updateTrip(trip.id, { status: 'todo' })}
    >
      <img
        aria-label={`Repeat ${trip.title} trip`}
        src="/replay.png"
        width="20px"
        height="20px"
        alt="repeat icon"
      />
      Repeat
    </button>
  );

  return (
    <div className={styles.container}>
      <img
        className={styles.photo}
        src={trip.photo_url}
        alt={`${trip.title} picture reference`}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{trip.title}</h3>
        {completedTabIsActive ? repeatButton : null}
        <p className={styles.description}>{trip.description}</p>
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.details}`}
            onClick={() => openTripModal(trip.id)}
          >
            See trip details
          </button>
          <button
            className={styles.button}
            onClick={() => openEditTripModal(trip.id)}
          >
            Edit
          </button>
          <button
            className={`${styles.button} ${styles.delete}`}
            onClick={() => deleteTrip(trip.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
