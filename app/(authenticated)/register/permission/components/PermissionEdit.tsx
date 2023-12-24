'use client'
import Button from "@/app/(authenticated)/components/button/Button";
import { Form } from "@/app/(authenticated)/components/form";
import { Input } from "@/app/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import TextArea from "@/app/(authenticated)/components/textarea/TextArea";
import Card from "@/app/(authenticated)/components/card/Card";
import { PermissionsProps, PermissionsTypeSchema } from "../types";
import { permissionsSchema } from "../schema";

import { updatePermissions } from "../actions/permissionsAction";

type Props = {
    permissions: PermissionsProps[],
    profileId: number
}

export default function PermissionEdit({ permissions, profileId }: Props ) {    
    const { 
    register: registerSearch,
    handleSubmit,
    setValue,
    reset,
    getValues,
    control,
    formState: { errors }
  } = useForm<PermissionsTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(permissionsSchema),
    
  })

 function handleUpdadePerrmissionSubmit(data: PermissionsTypeSchema) {
   console.log('data',data)
   const formData = getValues();
   const checkedIDs = formData.permissions.reduce((acc, item) => {
   const checkedAbilities = item.abilities
        .filter(ability => ability.checked)
        .map(ability => ability.id);
    return [...acc, ...checkedAbilities];
   }, []);
  const arrayOfObjects = checkedIDs.map(number => ({ id: number }));

  const profile = {
     name: data.name,
     abilities: arrayOfObjects
  }

 updatePermissions(`api/profile/${profileId}`,profile);
  
 }
console.log('erros', errors);


return (
  <>
    <Form.Root title="Editar permissões" onSubmit={handleSubmit(handleUpdadePerrmissionSubmit)}>
      <Form.InputContainer>
          <Input.Root>
            <Input.Label label="Nome"/>
            <Input.Input {...registerSearch('name')} />
            <Input.LabelError 
            helperText={errors.name?.message}
          />
          </Input.Root>
          <TextArea label="Descrição"/>
      </Form.InputContainer>
      <Form.Buttons>
        <Button 
          type='submit'
          icon={<MdAdd size={16} />}
          color="add" 
          label="Cadastrar"
        />
        
      </Form.Buttons>
    </Form.Root>
    
    <div className="sm:columns-4  lg:columns-4 columns-1 gap-3 mx-auto space-y-3 pb-28 sm:ml-4 ml-4 sm:mr-4">
    {permissions.map((permission, index) => (
          <Card key={index} title={permission.name}>
            {permission.abilities.map((ability, abilityIndex) => {
              const defaultValue  = {id: ability.id, checked: ability.hasAbilityProfile}
             
              
            return (<div key={abilityIndex}>   
                  <Controller
                    name={`permissions[${index}].abilities[${abilityIndex}]`}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field }) => (
                      <input
                        type="checkbox" 
                        defaultChecked={defaultValue.checked}
                        onChange={(e) => {
                          field.onChange({
                            id: ability.id,
                            checked: e.target.checked,
                          });
                        }}
                      />
                    )}
                  />
                  <label>
                    {ability.name}
                </label>
              </div>
            )})}
          </Card>
        ))}
      
    </div>
  </>
)
}