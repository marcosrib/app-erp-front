'use client'

import { TableCustom } from "@/app/(authenticated)/components/table";
import { FiEdit } from "react-icons/fi";

export default function ButtonEdit() {
    return (
        <TableCustom.Button 
        type="button"
        onClick={() => null} 
        color="edit">
       <TableCustom.Icon  icon={ <FiEdit
        color={'white'}  size={16}/> }/>
      </TableCustom.Button>
    )
}