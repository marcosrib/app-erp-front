'use client'

import { TableCustom } from "@/app/(authenticated)/components/table";
import { FaUnlock, FaLock } from "react-icons/fa";
import { updateStatusUser } from "../actions/userAction";
import { toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { generateIdRevalidate } from "@/app/utils/revalidate";
type Props = {
 data: any,
 page?: string | undefined
}
export default function ButtonActive({ data, page }: Props) {
    const router = useRouter();
    const searcheParams = useSearchParams();
    const pathName = usePathname();

    async function handleUpdateStatusUser(data: any): Promise<void> {
        const status = !data.status;
        const updateStatusResult =  await updateStatusUser(status, data.id);
        if(updateStatusResult.status !== 201) {
            toast.error(updateStatusResult.message);
            return
       }
       const params = new URLSearchParams(searcheParams.toString());
      
        const pageParam = page || '1';
        const rev_id =  generateIdRevalidate();
        params.set('page', pageParam)
        params.set('rev', `${rev_id}`), 
      
        router.push(`${pathName}/?${params.toString()}`);
    
       toast.success(updateStatusResult.message)
    }
    return (
        <TableCustom.Button
          data={data}
          onClick={handleUpdateStatusUser}
          color={data.status ? 'active' : 'inactive'}>
         <TableCustom.Icon icon={data.status ? <FaUnlock color={'white'} size={16}/> : <FaLock color={'white'} size={16}/>}/>
        </TableCustom.Button> 
        
    )
}