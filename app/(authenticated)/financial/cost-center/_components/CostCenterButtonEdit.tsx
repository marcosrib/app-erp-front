'use client';
import { TableCustom } from '@/app/(authenticated)/components/table';
import { FiEdit } from 'react-icons/fi';
import { useCostCenterStore } from '../store/useCostCenterStore';
import { CostCenterEditProps } from '../types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
interface Props {
  costCenterData: CostCenterEditProps;
}

export default function CostCenterButtonEdit({ costCenterData }: Props) {
  const { addCostCenterEdit } = useCostCenterStore();
  const router = useRouter();
  const searcheParams = useSearchParams();
  const pathName = usePathname();

  async function handleEditCostCenter(costCenterData: any): Promise<void> {
    addCostCenterEdit(costCenterData);
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
