'use client';
import { useCostCenterStore } from '../store/useCostCenterStore';
import CostCenterCreateForm from './CostCenterCreateForm';
import CostCenterEditForm from './CostCenterEditForm';
export default function CostCenterForm() {
  const { costCenterEdit, resetDataForm } = useCostCenterStore();
  function resetUseCostCenterStore() {
    resetDataForm();
  }
  return (
    <>
      {costCenterEdit.id != undefined ? (
        <CostCenterEditForm
          data={costCenterEdit}
          resetUseCostCenterStore={resetUseCostCenterStore}
        />
      ) : (
        <CostCenterCreateForm />
      )}
    </>
  );
}
