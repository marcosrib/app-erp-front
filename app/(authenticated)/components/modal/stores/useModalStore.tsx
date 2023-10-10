import { create } from 'zustand'

type ModalType = {
  isOpen: boolean;
  toggleModal: () => void;
}

export const useModalStore = create<ModalType>((set) => ({
  isOpen: false,
  toggleModal: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
}));

