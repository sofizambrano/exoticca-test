import { create } from 'zustand';

interface EditTripModalState {
  tripId: number | null;
  openModal: (tripId: number) => void;
  closeModal: () => void;
}

export const useEditTripModalStore = create<EditTripModalState>((set) => ({
  tripId: null,
  openModal: (tripId) => set({ tripId }),
  closeModal: () => set({ tripId: null }),
}));
