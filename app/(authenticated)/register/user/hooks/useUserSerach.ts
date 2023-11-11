import { useForm } from "react-hook-form"
import { UserSearchDataProps } from "../types"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSerachSchema } from "./schema"
import { useFilterStore } from "@/app/(authenticated)/hooks/useFilterStore"

export function useUserSerach() {
  
  const { addFilters} = useFilterStore();
  
    const { 
        control, 
        register: registerSearch,
        handleSubmit: handleSearchSubmit,
        setValue,
        formState: { errors }
      } = useForm<UserSearchDataProps>({
        mode: 'onBlur',
        resolver: zodResolver(userSerachSchema)
      })

    function handleAddfilters(data: UserSearchDataProps) {
      addFilters(data)
    }

return {
    control,
    registerSearch,
    handleSearchSubmit,
    handleAddfilters,
    searchErrros: errors
}
}