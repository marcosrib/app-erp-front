import { create } from 'zustand'
import { CostCenterEditProps } from '../types';

type StoreProps = {
    costCenterEdit: CostCenterEditProps,
    addCostCenterEdit: (user: CostCenterEditProps) => void;
    resetDataForm: () => void;
}

export const useCostCenterStore = create<StoreProps>((set) => ({
  costCenterEdit: {} as CostCenterEditProps,
  addCostCenterEdit: (user) =>
    set((state) => ({
      costCenterEdit: { ...state.costCenterEdit, ...user }, 
    })),
    resetDataForm: () => set({ costCenterEdit: {} as CostCenterEditProps })
}))