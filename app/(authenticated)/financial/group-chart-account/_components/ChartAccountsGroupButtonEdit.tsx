'use client';
import { TableCustom } from '@/app/(authenticated)/components/table';
import { FiEdit } from 'react-icons/fi';
import { ChartAccountsGroupEditProps } from '../types';
import { useChartAccountsGroupStore } from '../store/useChartAccountsGroupStore';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';
interface Props {
  groupChartAccountData: ChartAccountsGroupEditProps;
}

export default function GroupChartAccountButtonEdit({
  groupChartAccountData,
}: Props) {
  const { addGroupChartAccountEdit } = useChartAccountsGroupStore();
  const { setParam } = useURLParams();
  function handleEditChartAccountsGroup(
    costCenterData: ChartAccountsGroupEditProps
  ) {
    addGroupChartAccountEdit(costCenterData);
    openModal();
  }

  function openModal() {
    setParam('show-modal', 'chart-account-group-edit');
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
