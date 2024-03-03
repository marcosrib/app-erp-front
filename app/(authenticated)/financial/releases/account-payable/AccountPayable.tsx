import AccountPayableList from './_components/AccountPayableList';
import { AccountPayableSearchParamProps } from './types';

export default function AccountPayable({
  searchParams,
}: AccountPayableSearchParamProps) {
  return (
    <>
      <AccountPayableList searchParams={searchParams} />
    </>
  );
}
