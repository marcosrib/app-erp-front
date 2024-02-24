'use client';
import { TableCustom } from '@/app/(authenticated)/components/table';
import { FiEdit } from 'react-icons/fi';
import { useCostCenterStore } from '../store/useCostCenterStore';
import { CostCenterEditProps } from '../types';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';
interface Props {
  costCenterData: CostCenterEditProps;
}

export default function CostCenterButtonEdit({ costCenterData }: Props) {
  const { addCostCenterEdit } = useCostCenterStore();
  const { setParam } = useURLParams();

  async function handleEditCostCenter(costCenterData: any): Promise<void> {
    addCostCenterEdit(costCenterData);
    setParam('show-modal', 'cost-center-edit');
  }

  return (
    <TableCustom.Button
      data={costCenterData}
      onClick={handleEditCostCenter}
      color={'edit'}
    >
      <TableCustom.Icon icon={<FiEdit color={'white'} size={16} />} />
    </TableCustom.Button>
  );
}
