'use client'

import { TableCustom } from "@/app/(authenticated)/components/table";
import { FaUnlock, FaLock } from "react-icons/fa";
type Props = {
 status: boolean
}
export default function ButtonActive({ status }: Props) {
    return (
        <TableCustom.Button
         url=""
          color={status ? 'active' : 'inactive'}>
         <TableCustom.Icon icon={status ? <FaUnlock color={'white'} size={16}/> : <FaLock color={'white'} size={16}/>}/>
        </TableCustom.Button> 
        
    )
}