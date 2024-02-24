'use client';

import { useChartAccountStore } from '../store/useChartAccountStore';
import ChartAccountCreateForm from './ChartAccountCreateForm';
import ChartAccountEditForm from './ChartAccountEditForm';

export default function ChartAccountForm() {
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
          data={chartAccountEdit}
          resetChartAccountStore={resetChartAccountStore}
        />
      )}
    </>
  );
}
