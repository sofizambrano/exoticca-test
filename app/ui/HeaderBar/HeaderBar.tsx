'use client';

import { useCreateTripModalStore } from '@/stores/createTripModalStore';
import styles from './HeaderBar.module.css';

export default function HeaderBar(): JSX.Element {
  const { openModal: openCreateTripModal } = useCreateTripModalStore();

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <img src="/logo.png" width={40} height={40} alt="Exoticca logo" />
      </div>
      <button
        className={styles.button}
        type="button"
        onClick={openCreateTripModal}
      >
        Create new trip
      </button>
    </div>
  );
}
