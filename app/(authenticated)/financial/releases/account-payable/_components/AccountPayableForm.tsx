'use client';

import AccountPayableEditForm from './AccountPayableEditForm';
import AccountPayableCreateForm from './AccountPayableCreateForm';
import { useAccountPayableStore } from '../store/useAccountPayableStore';
import { SelectCostCenterProps } from '../../../cost-center/types';
type Props = {
  costCenter: SelectCostCenterProps[];
};
export default function AccountPayableForm({ costCenter }: Props) {
  const { accountPayableEdit, resetDataForm } = useAccountPayableStore();
  function resetUseCostCenterStore() {
    resetDataForm();
  }

  return (
    <>
      {accountPayableEdit.id != undefined ? (
        <AccountPayableEditForm
          data={accountPayableEdit}
          resetAccountPayableStore={resetUseCostCenterStore}
        />
      ) : (
        <AccountPayableCreateForm costCenter={costCenter} />
      )}
    </>
  );
}
