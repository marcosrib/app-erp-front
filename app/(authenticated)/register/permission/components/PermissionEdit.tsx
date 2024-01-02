'use client';
import Button from '@/app/(authenticated)/components/button/Button';
import { Form } from '@/app/(authenticated)/components/form';
import { Input } from '@/app/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';
import TextArea from '@/app/(authenticated)/components/textarea/TextArea';
import Card from '@/app/(authenticated)/components/card/Card';
import { PerfilProps, PermissionsProps, PermissionsTypeSchema } from '../types';
import { permissionSchema } from '../schema';

import { updatePermissions } from '../actions/permissionsAction';
import { CheckBox } from '@/app/(authenticated)/components/checkbox';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type Props = {
  permissions: PermissionsProps[];
  profileId: number;
  perfil?: PerfilProps;
};

export default function PermissionEdit({ permissions, profileId, perfil }: Props) {

  const router = useRouter();

  const {
    register: registerSearch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PermissionsTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(permissionSchema),
  });


  async function handleUpdadePerrmissionSubmit(formData: PermissionsTypeSchema) {
    
    const profile = await updatePermissions(`api/profile/${profileId}/`, formData);
    
    if (profile.status !== 201) {
      toast.error(profile.message);
      return;
    }

    router.push('/register/permission', { shallow: true } );
    toast.success(profile.message);

  }
 console.log('eroes',errors);
 
  return (
    <>
      <Form.Root
        title="Editar permissões"
        onSubmit={handleSubmit(handleUpdadePerrmissionSubmit)}
      >
        <Form.InputContainer>
          <Input.Root>
            <Input.Label label="Nome" />
            <Input.Input
             defaultValue={perfil?.name}
             {...registerSearch('name')}
            />
            <Input.LabelError helperText={errors.name?.message} />
          </Input.Root>
          <TextArea 
            {...registerSearch('description')}
            label="Descrição" 
            defaultValue={perfil?.description}
            errors={errors.description?.message} />
        </Form.InputContainer>
        <Form.Buttons>
          <Button
            type="submit"
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
              const defaultValue = {
                id: ability.id,
                checked: ability.hasAbilityProfile,
              };

              return (
                <div className="flex items-center" key={abilityIndex}>
                  <Controller
                    name={
                      `permissions[${index}].abilities[${abilityIndex}]` as any
                    }
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field }) => (
                      <CheckBox
                        name={`permissions[${index}].abilities[${abilityIndex}]`}
                        label={ability.name}
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
                </div>
              );
            })}
          </Card>
        ))}
      </div>
    </>
  );
}
