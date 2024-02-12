'use client';

import { useModalStore } from '@/app/(authenticated)/components/modal/stores/useModalStore';
import { TableCustom } from '@/app/(authenticated)/components/table';
import { FiEdit } from 'react-icons/fi';
import { useCostCenterStore } from '../store/useCostCenterStore';
import { CostCenterEditProps } from '../types';
interface Props {
  costCenterData: CostCenterEditProps;
}

export default function CostCenterButtonEdit({ costCenterData }: Props) {
  const { toggleModal } = useModalStore();
  const { addCostCenterEdit } = useCostCenterStore();

  async function handleEditUser(costCenterData: any): Promise<void> {
    toggleModal();
    addCostCenterEdit(costCenterData);
  }

  return (
    <TableCustom.Button
      data={costCenterData}
      onClick={handleEditUser}
      color={'edit'}
    >
      <TableCustom.Icon icon={<FiEdit color={'white'} size={16} />} />
    </TableCustom.Button>
  );
}
