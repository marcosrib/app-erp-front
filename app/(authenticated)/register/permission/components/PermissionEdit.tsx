'use client';
import Button from '@/app/(authenticated)/components/button/Button';
import { Form } from '@/app/(authenticated)/components/form';
import { Input } from '@/app/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';
import TextArea from '@/app/(authenticated)/components/textarea/TextArea';
import Card from '@/app/(authenticated)/components/card/Card';
import {
  AbilityIdsProps,
  PermissionsProps,
  PermissionsTypeSchema,
  SelectedAbilitiesProps,
} from '../types';
import { permissionSchema } from '../schema';

import { updatePermissions } from '../actions/permissionsAction';

type Props = {
  permissions: PermissionsProps[];
  profileId: number;
};

export default function PermissionEdit({ permissions, profileId }: Props) {
  const {
    register: registerSearch,
    handleSubmit,
    setValue,
    reset,

    control,
    formState: { errors },
  } = useForm<PermissionsTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(permissionSchema),
  });

  function handleUpdadePerrmissionSubmit(formData: PermissionsTypeSchema) {
    console.log('form data', formData);

    const checkedAbilities = formData.permissions.flatMap((item) =>
      item.abilities
        .filter((ability) => ability.checked)
        .map((ability) => ({ id: ability.id }))
    ) as AbilityIdsProps[];

    const permission = {
      name: formData.name,
      abilities: checkedAbilities,
    };

    updatePermissions(`api/profile/${profileId}/`, permission);
  }

  return (
    <>
      <Form.Root
        title="Editar permissões"
        onSubmit={handleSubmit(handleUpdadePerrmissionSubmit)}
      >
        <Form.InputContainer>
          <Input.Root>
            <Input.Label label="Nome" />
            <Input.Input {...registerSearch('name')} />
            <Input.LabelError helperText={errors.name?.message} />
          </Input.Root>
          <TextArea label="Descrição" />
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
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                  <label className="ml-2 font-medium text-gray-700 dark:text-gray-300">
                    {ability.name}
                  </label>
                </div>
              );
            })}
          </Card>
        ))}
      </div>
    </>
  );
}
