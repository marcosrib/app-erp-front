'use client';
import { TableCustom } from '@/app/(authenticated)/components/table';
import { FiEdit } from 'react-icons/fi';
import { useUserStore } from '../store/useUserStore';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';
interface Props {
  user: any;
}

export default function ButtonEdit({ user }: Props) {
  const { addUserEdit } = useUserStore();
  const { setParam } = useURLParams();
  async function handleEditUser(data: any): Promise<void> {
    addUserEdit(data);
    openModal();
  }

  function openModal() {
    setParam('show-modal', 'user-edit');
  }

  return (
    <TableCustom.Button data={user} onClick={handleEditUser} color={'edit'}>
      <TableCustom.Icon icon={<FiEdit color={'white'} size={16} />} />
    </TableCustom.Button>
  );
}
