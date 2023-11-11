import { create } from 'zustand'

type StoreProps = {
    filters: {},
    addFilters: (filter: {}) => void;
}

export const useFilterStore = create<StoreProps>((set) => ({
    filters: {},
    addFilters: (filter) =>
    set((state) => ({
        filters: { ...state.filters, ...filter }, 
    })),
}))