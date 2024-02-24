'use client';

import { useModalStore } from '@/app/(authenticated)/components/modal/stores/useModalStore';
import { TableCustom } from '@/app/(authenticated)/components/table';
import { FiEdit } from 'react-icons/fi';
import { useUserStore } from '../store/useUserStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
interface Props {
  user: any;
}

export default function ButtonEdit({ user }: Props) {
  const { addUserEdit } = useUserStore();
  const router = useRouter();
  const searcheParams = useSearchParams();
  const pathName = usePathname();
  async function handleEditUser(data: any): Promise<void> {
    addUserEdit(data);
    openModal();
  }

  function openModal() {
    const params = new URLSearchParams(searcheParams.toString());
    params.set('showModal', 'useredit');
    router.push(`${pathName}/?${params.toString()}`);
  }

  return (
    <TableCustom.Button data={user} onClick={handleEditUser} color={'edit'}>
      <TableCustom.Icon icon={<FiEdit color={'white'} size={16} />} />
    </TableCustom.Button>
  );
}
