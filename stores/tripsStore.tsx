import { Trip } from '@/types/Trip';
import { create } from 'zustand';

interface TripsState {
  trips: Trip[];
  setTrips: (trips: Trip[]) => void;
  addTrip: (trip: Trip) => void;
  deleteTrip: (tripId: number) => void;
  updateTrip: (tripId: number, updatedTrip: Partial<Trip>) => void;
}

const useTripsStore = create<TripsState>((set) => ({
  trips: [],
  setTrips: (trips: Trip[]) => set({ trips }),
  addTrip: (trip: Trip) =>
    set((state) => ({
      trips: [...state.trips, trip],
    })),
  deleteTrip: (tripId: number) =>
    set((state) => ({
      trips: state.trips.filter((trip) => trip.id !== tripId),
    })),
  updateTrip: (tripId: number, updatedTrip: Partial<Trip>) =>
    set((state) => ({
      trips: state.trips.map((trip) =>
        trip.id === tripId ? { ...trip, ...updatedTrip } : trip
      ),
    })),
}));

export default useTripsStore;
