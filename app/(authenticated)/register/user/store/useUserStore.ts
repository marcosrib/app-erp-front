import { create } from 'zustand'
import { UserDataProps } from '../types';


type StoreProps = {
    userEdit: UserDataProps,
    addUserEdit: (user: UserDataProps) => void;
}

export const useUserStore = create<StoreProps>((set) => ({
  userEdit: {} as UserDataProps,
  addUserEdit: (user) =>
    set((state) => ({
      userEdit: { ...state.userEdit, ...user }, 
    })),
}))