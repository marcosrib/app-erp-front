'use client';
import { TableCustom } from '@/app/(authenticated)/components/table';
import { FiEdit } from 'react-icons/fi';
import { ChartAccountsGroupEditProps } from '../types';
import { useChartAccountsGroupStore } from '../store/useChartAccountsGroupStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
interface Props {
  groupChartAccountData: ChartAccountsGroupEditProps;
}

export default function GroupChartAccountButtonEdit({
  groupChartAccountData,
}: Props) {
  const router = useRouter();
  const searcheParams = useSearchParams();
  const pathName = usePathname();
  const { addGroupChartAccountEdit } = useChartAccountsGroupStore();

  function handleEditChartAccountsGroup(
    costCenterData: ChartAccountsGroupEditProps
  ) {
    addGroupChartAccountEdit(costCenterData);
    openModal();
  }

  function openModal() {
    const params = new URLSearchParams(searcheParams.toString());
    params.set('showModal', 'acgedit');
    router.push(`${pathName}/?${params.toString()}`);
  }

  return (
    <TableCustom.Button
      data={groupChartAccountData}
      onClick={handleEditChartAccountsGroup}
      color={'edit'}
    >
      <TableCustom.Icon icon={<FiEdit color={'white'} size={16} />} />
    </TableCustom.Button>
  );
}
