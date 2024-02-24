'use client';

import { SelectChartAccountsGroupProps } from '../../group-chart-account/types';
import { useChartAccountStore } from '../store/useChartAccountStore';
import ChartAccountCreateForm from './ChartAccountCreateForm';
import ChartAccountEditForm from './ChartAccountEditForm';
type Props = {
  chartAccountsGroupData: SelectChartAccountsGroupProps[];
};
export default function ChartAccountForm({ chartAccountsGroupData }: Props) {
  const { chartAccountEdit, resetDataForm } = useChartAccountStore();
  function resetChartAccountStore() {
    resetDataForm();
  }

  return (
    <>
      {chartAccountEdit.id === undefined ? (
        <ChartAccountCreateForm />
      ) : (
        <ChartAccountEditForm
          chartAccountsGroupData={chartAccountsGroupData}
          data={chartAccountEdit}
          resetChartAccountStore={resetChartAccountStore}
        />
      )}
    </>
  );
}
