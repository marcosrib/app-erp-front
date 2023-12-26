'use client';
import Select from 'react-select';
import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/app/components/input';
import Button from '../../../components/button/Button';
import { Modal } from '../../../components/modal';
import { CheckBox } from '@/app/(authenticated)/components/checkbox';
import { SelectProfileOptionsProps, UserCreateTypeSchema } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { userCreateSchema } from '../schemas/userCreateSchema';
import { createUser } from '../actions/userAction';
import { useModalStore } from '@/app/(authenticated)/components/modal/stores/useModalStore';
import { toast } from 'react-toastify';
import { generateIdRevalidate } from '@/app/utils/revalidate';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  profile: SelectProfileOptionsProps[] | undefined;
};

export default function UserCreateForm({ profile }: Props) {
  const { toggleModal } = useModalStore();
  const router = useRouter();
  const searcheParams = useSearchParams();
  const pathName = usePathname();

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreateTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(userCreateSchema),
  });

  async function submitUserForm(data: UserCreateTypeSchema) {
    const userResult = await createUser(data);
    if (userResult.status !== 201) {
      toast.error(userResult.message);
      return;
    }
    toggleModal();
    toast.success(userResult.message);
    const params = new URLSearchParams(searcheParams.toString());

    const rev_id = generateIdRevalidate();
    params.set('page', '1');
    params.set('rev', `${rev_id}`);

    router.push(`${pathName}/?${params.toString()}`);
    reset();
  }
  return (
    <>
      <Modal.Root title={'Cadastrar Usuário'}>
        <Modal.Form onSubmit={handleSubmit(submitUserForm)}>
          <Modal.FormInputs>
            <Input.Root>
              <Input.Label label="Nome" />
              <Input.Input {...register('name')} />
              <Input.LabelError helperText={errors.name?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="E-mail" />
              <Input.Input {...register('email')} />
              <Input.LabelError helperText={errors.email?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Senha" />
              <Input.Input {...register('password')} />
              <Input.LabelError helperText={errors.password?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Perfis" />
              <Controller
                name="profile"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={false}
                    options={profile}
                    classNames={{
                      control: (state) =>
                        clsx(
                          state.isFocused
                            ? '!border-indigo-600 !outline-none !shadow-none'
                            : '!border-gray-300',
                          'p-0.5 !rounded-lg'
                        ),
                    }}
                  />
                )}
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
                    defaultChecked={false}
                    onChange={onChange}
                    label="Status"
                  />
                )}
              />
            </Input.Root>
          </Modal.FormInputs>
          <Modal.FormFooter>
            <Button label={'Cadastrar'} color="search" type="submit" />
          </Modal.FormFooter>
        </Modal.Form>
      </Modal.Root>
    </>
  );
}
