'use client';
import React from 'react';

import styles from './TripModal.module.css';
import { useTripModalStore } from '@/stores/tripModalStore';
import Modal from '@/app/ui/Modal/Modal';
import Header from './Header/Header';
import Itinerary from './Itinerary/Itinerary';
import { useTripsStore } from '@/stores/tripsStore';

const TripModal: React.FC = React.memo(() => {
  const { trips } = useTripsStore();
  const { tripId, closeModal } = useTripModalStore();
  const trip = trips.find((trip) => trip.id === tripId);

  if (tripId === null || trip === undefined) return null;

  return (
    <Modal isOpen={tripId !== null} onClose={closeModal}>
      <img
        className={styles.photo}
        src={trip.photo_url}
        width="100%"
        height="250px"
        alt={`${trip.title} picture reference`}
      />
      <div className={styles.content}>
        <Header {...trip} />
        <p className={styles.description}>{trip.description}</p>
        <div className={styles.divider}></div>
        <div className={styles.section}>Itinerary</div>
        {trip.itinerary.length >= 1 ? (
          <Itinerary {...trip} />
        ) : (
          <p className={styles.description}>No itinerary</p>
        )}
      </div>
    </Modal>
  );
});

export default TripModal;
