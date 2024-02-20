import { useModalStore } from '@/app/(authenticated)/components/modal/stores/useModalStore';
import { TableCustom } from '@/app/(authenticated)/components/table';
import { FiEdit } from 'react-icons/fi';
import { ChartAccountsGroupEditProps } from '../types';
import { useChartAccountsGroupStore } from '../store/useChartAccountsGroupStore';
interface Props {
  groupChartAccountData: ChartAccountsGroupEditProps;
}

export default function GroupChartAccountButtonEdit({
  groupChartAccountData,
}: Props) {
  const { toggleModal } = useModalStore();
  const { addGroupChartAccountEdit } = useChartAccountsGroupStore();

  async function handleEditUser(
    costCenterData: ChartAccountsGroupEditProps
  ): Promise<void> {
    toggleModal();
    addGroupChartAccountEdit(costCenterData);
  }

  return (
    <TableCustom.Button
      data={groupChartAccountData}
      onClick={handleEditUser}
      color={'edit'}
    >
      <TableCustom.Icon icon={<FiEdit color={'white'} size={16} />} />
    </TableCustom.Button>
  );
}
