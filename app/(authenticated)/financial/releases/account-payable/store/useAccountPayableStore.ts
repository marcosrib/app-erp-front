import { create } from 'zustand'
import { AccountPayableEditProps } from '../types';

type StoreProps = {
    accountPayableEdit: AccountPayableEditProps,
    addAccountPayableEdit: (user: AccountPayableEditProps) => void;
    resetDataForm: () => void;
}

export const useAccountPayableStore = create<StoreProps>((set) => ({
    accountPayableEdit: {} as AccountPayableEditProps,
    addAccountPayableEdit: (user) =>
    set((state) => ({
        accountPayableEdit: { ...state.accountPayableEdit, ...user }, 
    })),
    resetDataForm: () => set({ accountPayableEdit: {} as AccountPayableEditProps })
}))