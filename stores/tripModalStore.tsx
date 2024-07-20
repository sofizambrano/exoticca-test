import { create } from 'zustand';

interface TripModalState {
  tripId: number | null;
  openModal: (tripId: number) => void;
  closeModal: () => void;
}

export const useTripModalStore = create<TripModalState>((set) => ({
  tripId: null,
  openModal: (tripId) => set({ tripId }),
  closeModal: () => set({ tripId: null }),
}));
