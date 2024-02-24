'use client';

import { CheckBox } from '@/app/(authenticated)/components/checkbox';
import { Modal } from '@/app/(authenticated)/components/modal';
import { Input } from '@/app/components/input';
import { Controller, useForm } from 'react-hook-form';
import Button from '@/app/(authenticated)/components/button/Button';
import { useModalStore } from '@/app/(authenticated)/components/modal/stores/useModalStore';
import { userEditSchema } from '../schemas/userEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectProfileOptionsProps, UserEditFormTypeSchema } from '../types';
import { toast } from 'react-toastify';
import CustomSelect from '@/app/(authenticated)/components/select/CustomSelect';
import { useUserStore } from '../store/useUserStore';
import { useEffect } from 'react';
import { updateUser } from '../actions/userAction';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { generateIdRevalidate } from '@/app/utils/revalidate';

type Props = {
  profile: SelectProfileOptionsProps[];
};

export default function UserEditForm({ profile }: Props) {
  const { userEdit: user } = useUserStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserEditFormTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(userEditSchema),
  });

  async function submitUserForm(data: UserEditFormTypeSchema) {
    const updateUserResult = await updateUser(data, user.id);
    if (updateUserResult.status !== 204) {
      toast.error(updateUserResult.message);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());

    const pageParam = params.get('page') || '1';
    const rev_id = generateIdRevalidate();
    params.set('page', pageParam);
    params.set('rev', `${rev_id}`),
      router.push(`${pathName}/?${params.toString()}`);
    toast.success(updateUserResult.message);
  }

  useEffect(() => {
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('status', user.status);
    if (user?.profiles && user.profiles.length > 0) {
      setValue('profile', {
        value: user.profiles[0]?.id,
        label: user.profiles[0]?.name,
      });
    } else {
      setValue('profile', { value: 0, label: '' });
    }
  }, [user]);

  function closeModal() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('showModal');
    router.push(`${pathName}/?${params.toString()}`);
  }

  return (
    <>
      <Modal.Root
        closeModal={closeModal}
        isOpen={searchParams.get('showModal') === 'useredit'}
        title={'Editar Usuário'}
      >
        <Modal.Form onSubmit={handleSubmit(submitUserForm)}>
          <Modal.FormInputs>
            <Input.Root>
              <Input.Label label="Nome" />
              <Input.Input defaultValue={user?.name} {...register('name')} />
              <Input.LabelError helperText={errors.name?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="E-mail" />
              <Input.Input defaultValue={user?.email} {...register('email')} />
              <Input.LabelError helperText={errors.email?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Senha" />
              <Input.Input {...register('password')} />
              <Input.LabelError helperText={errors.password?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Perfis" />
              <CustomSelect
                name="profile"
                options={profile}
                control={control}
              />
              <Input.LabelError helperText={errors.profile?.value?.message} />
            </Input.Root>
            <Input.Root>
              <Controller
                name="status"
                control={control}
                render={({ field: { onChange } }) => (
                  <CheckBox
                    name="status"
                    defaultChecked={user?.status}
                    onChange={onChange}
                    label="Status"
                  />
                )}
              />
            </Input.Root>
          </Modal.FormInputs>
          <Modal.FormFooter>
            <Button label={'Atualizar'} color="search" type="submit" />
          </Modal.FormFooter>
        </Modal.Form>
      </Modal.Root>
    </>
  );
}
