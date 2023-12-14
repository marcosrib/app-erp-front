'use client'

import { useModalStore } from "@/app/(authenticated)/components/modal/stores/useModalStore";
import { TableCustom } from "@/app/(authenticated)/components/table";
import { FiEdit } from "react-icons/fi";
import { useUserStore } from "../store/useUserStore";
interface Props {
    user: any;
}

export default function ButtonEdit({user}: Props) {
 const { toggleModal } = useModalStore();
 const { addUserEdit  } = useUserStore();
    
  async function handleEditUser(data: any): Promise<void> {
    toggleModal();
    addUserEdit(data);
  }

  return (
    <TableCustom.Button
          data={user}
          onClick={handleEditUser}
          color={'edit'}
        >
        <TableCustom.Icon icon={ <FiEdit color={'white'}  size={16}/> }/>
        </TableCustom.Button> 
  )

}