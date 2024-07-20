'use client';
import React, { useEffect, useState } from 'react';
import styles from './EditTripModal.module.css';
import Modal from '@/app/ui/Modal/Modal';
import { useTripsStore } from '@/stores/tripsStore';
import { useEditTripModalStore } from '@/stores/editTripModalStore';
import TripForm from '../TripForm/TripForm';
import { Trip } from '@/types/Trip';

const EditTripModal: React.FC = React.memo(() => {
  const { trips, updateTrip } = useTripsStore();
  const { tripId, closeModal } = useEditTripModalStore();
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const trip = trips.find((trip) => trip.id === tripId);
    setTrip(trip ?? null);
  }, [trips, tripId]);

  if (tripId === null || trip === null) return null;

  const handleUpdateTrip = (data: Omit<Trip, 'id' | 'status'>) => {
    updateTrip(tripId, data);
    closeModal();
  };

  return (
    <Modal isOpen={tripId !== null} onClose={closeModal}>
      <div className={styles.content}>
        <h2 className={styles.title}>Update trip</h2>
        <TripForm initialData={trip} onSubmit={handleUpdateTrip} />
      </div>
    </Modal>
  );
});

export default EditTripModal;
