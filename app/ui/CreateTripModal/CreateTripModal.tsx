'use client';
import React from 'react';

import styles from './CreateTripModal.module.css';
import Modal from '@/app/ui/Modal/Modal';
import { useTripsStore } from '@/stores/tripsStore';

import TripForm from '../TripForm/TripForm';
import { Trip } from '@/types/Trip';
import { useCreateTripModalStore } from '@/stores/createTripModalStore';

const CreateTripModal: React.FC = React.memo(() => {
  const { addTrip } = useTripsStore();
  const { isOpen, closeModal } = useCreateTripModalStore();

  const handleCreateTrip = (data: Omit<Trip, 'id' | 'status'>) => {
    const newTrip: Trip = {
      ...data,
      status: 'todo',
      id: Math.random(),
    };
    addTrip(newTrip);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className={styles.content}>
        <h2 className={styles.title}>Create a trip</h2>
        <TripForm onSubmit={handleCreateTrip} />
      </div>
    </Modal>
  );
});

export default CreateTripModal;
