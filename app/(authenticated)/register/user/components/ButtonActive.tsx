'use client';

import { TableCustom } from '@/app/(authenticated)/components/table';
import { FaUnlock, FaLock } from 'react-icons/fa';
import { updateStatusUser } from '../actions/userAction';
import { toast } from 'react-toastify';
type Props = {
  data: any;
};
export default function ButtonActive({ data }: Props) {
  async function handleUpdateStatusUser(data: any): Promise<void> {
    const status = !data.status;
    const updateStatusResult = await updateStatusUser(status, data.id);
    if (updateStatusResult.status !== 201) {
      toast.error(updateStatusResult.message);
      return;
    }
    toast.success(updateStatusResult.message);
  }
  return (
    <TableCustom.Button
      data={data}
      onClick={handleUpdateStatusUser}
      color={data.status ? 'active' : 'inactive'}
    >
      <TableCustom.Icon
        icon={
          data.status ? (
            <FaUnlock color={'white'} size={16} />
          ) : (
            <FaLock color={'white'} size={16} />
          )
        }
      />
    </TableCustom.Button>
  );
}
