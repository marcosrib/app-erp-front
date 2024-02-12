import CostCenterForm from './_components/CostCenterForm';
import CostCenterList from './_components/CostCenterList';
import { SearchParamProps } from './types';

export default function CostCenter({ searchParams }: SearchParamProps) {
  return (
    <>
      <CostCenterForm />
      <CostCenterList searchParams={searchParams} />
    </>
  );
}
