import { getChartAccounts } from '../../chart-account/actions/chartAccountAction';
import { getCostCenter } from '../../cost-center/actions/costCenterAction';
import AccountPayableForm from './_components/AccountPayableForm';
import AccountPayableList from './_components/AccountPayableList';
import AccountPayableSearch from './_components/AccountPayableSearch';
import { AccountPayableSearchParamProps } from './types';

export default async function AccountPayable({
  searchParams,
}: AccountPayableSearchParamProps) {
  const costCenter = await getCostCenter();
  const chartAccounts = await getChartAccounts();
  return (
    <>
      <AccountPayableForm
        charAccounts={chartAccounts}
        costCenter={costCenter}
      />
      <AccountPayableSearch
        costCenter={costCenter}
        searchParams={searchParams}
      />
      <AccountPayableList searchParams={searchParams} />
    </>
  );
}
