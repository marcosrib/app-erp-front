import { create } from 'zustand'
import { GroupChartAccountEditProps } from '../types';

type StoreProps = {
    groupChartAccountEdit: GroupChartAccountEditProps,
    addGroupChartAccountEdit: ( groupChartAccount: GroupChartAccountEditProps) => void;
    resetDataForm: () => void;
}

export const useChartAccountsGroupStore = create<StoreProps>((set) => ({
    groupChartAccountEdit: {} as GroupChartAccountEditProps,
  addGroupChartAccountEdit: (groupChartAccount) =>
    set((state) => ({
        groupChartAccountEdit: { ...state.groupChartAccountEdit, ...groupChartAccount }, 
    })),
    resetDataForm: () => set({ groupChartAccountEdit: {} as GroupChartAccountEditProps })
}))