import { create } from 'zustand'
import { ChartAccountEditProps } from '../types';

type StoreProps = {
    chartAccountEdit: ChartAccountEditProps,
    addChartAccountEdit: ( groupChartAccount: ChartAccountEditProps) => void;
    resetDataForm: () => void;
}

export const useChartAccountStore = create<StoreProps>((set) => ({
    chartAccountEdit: {} as ChartAccountEditProps,
  addChartAccountEdit: (chartAccount) =>
    set((state) => ({
        chartAccountEdit: { ...state.chartAccountEdit, ...chartAccount }, 
    })),
    resetDataForm: () => set({ chartAccountEdit: {} as ChartAccountEditProps })
}))