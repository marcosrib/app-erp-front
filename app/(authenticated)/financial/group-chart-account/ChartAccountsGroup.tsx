import ChartAccountsGroupForm from './_components/ChartAccountsGroupForm';
import ChartAccountsGroupList from './_components/ChartAccountsGroupList';
import { SearchParamProps } from './types';

export default function ChartAccountsGroup({ searchParams }: SearchParamProps) {
  return (
    <>
      <ChartAccountsGroupForm />
      <ChartAccountsGroupList searchParams={searchParams} />
    </>
  );
}
