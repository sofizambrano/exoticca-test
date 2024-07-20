import { create } from 'zustand';

interface CreateTripModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useCreateTripModalStore = create<CreateTripModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
