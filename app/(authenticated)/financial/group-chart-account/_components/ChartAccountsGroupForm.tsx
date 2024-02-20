'use client';

import { useChartAccountsGroupStore } from '../store/useChartAccountsGroupStore';
import ChartAccountsGroupCreateForm from './ChartAccountsGroupCreateForm';
import ChartAccountsGroupEditForm from './ChartAccountsGroupEditForm';

export default function ChartAccountsGroupForm() {
  const { groupChartAccountEdit, resetDataForm } = useChartAccountsGroupStore();
  function resetChartAccountsGroupStore() {
    resetDataForm();
  }
  return (
    <>
      {groupChartAccountEdit.id != undefined ? (
        <ChartAccountsGroupEditForm
          data={groupChartAccountEdit}
          resetChartAccountsGroupStore={resetChartAccountsGroupStore}
        />
      ) : (
        <ChartAccountsGroupCreateForm />
      )}
    </>
  );
}
