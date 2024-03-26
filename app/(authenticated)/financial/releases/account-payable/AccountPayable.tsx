import { getCostCenter } from '../../cost-center/actions/costCenterAction';
import AccountPayableForm from './_components/AccountPayableForm';
import AccountPayableList from './_components/AccountPayableList';
import AccountPayableSearch from './_components/AccountPayableSearch';
import { AccountPayableSearchParamProps } from './types';

export default async function AccountPayable({
  searchParams,
}: AccountPayableSearchParamProps) {
  const costCenter = await getCostCenter();
  return (
    <>
      <AccountPayableForm costCenter={costCenter} />
      <AccountPayableSearch
        costCenter={costCenter}
        searchParams={searchParams}
      />
      <AccountPayableList searchParams={searchParams} />
    </>
  );
}
