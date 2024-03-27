'use client';

import AccountPayableEditForm from './AccountPayableEditForm';
import AccountPayableCreateForm from './AccountPayableCreateForm';
import { useAccountPayableStore } from '../store/useAccountPayableStore';
import { SelectCostCenterProps } from '../../../cost-center/types';
import { SelectChartAccountOptionsProps } from '../../../chart-account/types';
type Props = {
  costCenter: SelectCostCenterProps[];
  charAccounts: SelectChartAccountOptionsProps[];
};
export default function AccountPayableForm({
  costCenter,
  charAccounts,
}: Props) {
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
        <AccountPayableCreateForm
          costCenter={costCenter}
          charAccounts={charAccounts}
        />
      )}
    </>
  );
}
