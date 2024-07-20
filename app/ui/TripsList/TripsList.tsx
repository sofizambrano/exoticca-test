'use client';
import { getTrips } from '@/services/api';
import { useEffect, useState } from 'react';
import TripCard from './TripCard/TripCard';
import styles from './TripsList.module.css';
import useTripsStore from '@/stores/tripsStore';

import { useSearchParams } from 'next/navigation';
import Tabs from './Tabs/Tabs';
import { Trip } from '@/types/Trip';
import { TripsListSkeleton } from './Skeleton/Skeleton';

interface Tab {
  label: string;
  value: Trip['status'] | null;
}

const tabs: Tab[] = [
  { label: 'All', value: null },
  { label: 'Upcoming', value: 'todo' },
  { label: 'Completed', value: 'done' },
];

export default function TripsList() {
  const { trips, setTrips } = useTripsStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(trips);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async (signal: RequestInit['signal']) => {
      try {
        setLoading(true);
        const result = await getTrips(signal);
        const tripsWithNewIds: Trip[] = [];
        // This had to be done because Mexico and South Corea had the same id: 5
        result.forEach((trip) => {
          tripsWithNewIds.push({
            ...trip,
            id: trip.id + Math.random(),
          });
        });
        setTrips(tripsWithNewIds);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const controller = new AbortController();
    const signal = controller.signal;
    fetchData(signal);

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const status = searchParams.get('status');
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';
    const filtered = trips
      .filter((trip) => (status ? trip.status === status : true))
      .filter(
        (trip) =>
          trip.title.toLowerCase().includes(searchQuery) ||
          trip.description.toLowerCase().includes(searchQuery) ||
          trip.itinerary.some(
            (item) =>
              item.description.toLowerCase().includes(searchQuery) ||
              item.location.toLowerCase().includes(searchQuery)
          )
      );
    setFilteredTrips(filtered);
  }, [searchParams, trips]);

  if (error) return <div>There was an error fetching the trips</div>;

  return (
    <div className={styles.container}>
      <Tabs tabs={tabs} />

      {loading ? (
        <TripsListSkeleton />
      ) : filteredTrips.length >= 1 ? (
        filteredTrips.map((trip) => <TripCard key={trip.id} {...trip} />)
      ) : (
        <p className={styles.description}>No trips</p>
      )}
    </div>
  );
}
