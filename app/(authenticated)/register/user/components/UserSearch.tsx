import Button from "@/app/(authenticated)/components/button/Button";
import { FormSearch } from "@/app/(authenticated)/components/formSearch";
import { Input } from "@/app/components/input";
import { useUserSerach } from "../hooks/useUserSerach";
import { MdAdd } from "react-icons/md";
import { useSearchParams } from "next/navigation";


export default function UserSearch() {

    const { handleSearchSubmit, handleAddfilters, registerSearch, searchErrros } = useUserSerach();
    const searcheParams = useSearchParams();

    function handleOpenModal() {

    }

    return (
        <FormSearch.Root  onSubmit={handleSearchSubmit(handleAddfilters)}>
        <FormSearch.InputContainer>
            <Input.Root>
              <Input.Label label="E-mail"/>
              <Input.Input {...registerSearch('email')} />
              <Input.LabelError 
              helperText={searchErrros.email?.message}
            />
            </Input.Root>
        </FormSearch.InputContainer>
        <FormSearch.Buttons>
        <Button
           type='submit' 
           color="search" 
           label="Pesquisar"
          />
        <Button
           type='button' 
           color="clean" 
           label="Limpar"
          />
         <Button 
           type='button'
           icon={<MdAdd size={16} />}
           color="add" 
           label="Adicionar"
           onClick={handleOpenModal}
          />
         
        </FormSearch.Buttons>
      </FormSearch.Root>
    )
}