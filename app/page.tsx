import TripsList from '@/app/ui/TripsList/TripsList';
import styles from './pages.module.css';
import TripModal from '@/app/ui/TripModal/TripModal';
import SearchBar from '@/app/ui/SearchBar/SearchBar';
import EditTripModal from '@/app/ui/EditTripModal/EditTripModal';
import CreateTripModal from './ui/CreateTripModal/CreateTripModal';

export default function Page() {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.intro}>
          <h1 className={styles.title}>The places you dream of</h1>
          <h2 className={styles.subtitle}>Let's live new adventures</h2>
        </div>
        <SearchBar />
      </div>

      <TripsList />

      <TripModal />
      <EditTripModal />
      <CreateTripModal />
    </>
  );
}
