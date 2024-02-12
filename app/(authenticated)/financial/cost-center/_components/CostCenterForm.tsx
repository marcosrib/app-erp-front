'use client';
import { useCostCenterStore } from '../store/useCostCenterStore';
import CostCenterCreateForm from './CostCenterCreateForm';
import CostCenterEditForm from './CostCenterEditForm';
export default function CostCenterForm() {
  const { costCenterEdit } = useCostCenterStore();
  console.log(costCenterEdit);
  console.log('gnknlç');
  return (
    <>
      {costCenterEdit.id != undefined ? (
        <CostCenterEditForm data={costCenterEdit} />
      ) : (
        <CostCenterCreateForm />
      )}
    </>
  );
}
