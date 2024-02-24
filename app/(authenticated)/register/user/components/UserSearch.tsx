'use client';
import Button from '@/app/(authenticated)/components/button/Button';
import { Form } from '@/app/(authenticated)/components/form';
import { Input } from '@/app/components/input';
import { MdAdd } from 'react-icons/md';
import { useUserStore } from '../store/useUserStore';
import { ParamsProps, UserSearchDataProps } from '../types';
import { userSerachSchema } from '../hooks/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';

export default function UserSearch({ searchParams }: ParamsProps) {
  const { setMultipleParam, deleteParam, deleteMultipleParam, setParam } =
    useURLParams();
  const { resetDataForm } = useUserStore();

  const {
    register: registerSearch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserSearchDataProps>({
    mode: 'onBlur',
    resolver: zodResolver(userSerachSchema),
  });

  function handleOpenModal() {
    resetDataForm();
    setParam('show-modal', 'user-create');
  }

  useEffect(() => {
    if (searchParams?.email) {
      setValue('email', searchParams.email);
    }
  }, [searchParams]);

  function handleSearchSubmit(data: UserSearchDataProps) {
    const params = [
      {
        key: 'page',
        value: '1',
      },
      {
        key: 'email',
        value: data.email,
      },
    ];
    setMultipleParam(params);
  }

  function clearForm() {
    deleteMultipleParam(['page', 'email']);
    reset();
  }
  return (
    <Form.Root title="Usuários" onSubmit={handleSubmit(handleSearchSubmit)}>
      <Form.InputContainer>
        <Input.Root>
          <Input.Label label="E-mail" />
          <Input.Input {...registerSearch('email')} />
          <Input.LabelError helperText={errors.email?.message} />
        </Input.Root>
      </Form.InputContainer>
      <Form.Buttons>
        <Button type="submit" color="search" label="Pesquisar" />
        <Button
          type="button"
          color="clean"
          label="Limpar"
          onClick={clearForm}
        />
        <Button
          type="button"
          icon={<MdAdd size={16} />}
          color="add"
          label="Adicionar"
          onClick={handleOpenModal}
        />
      </Form.Buttons>
    </Form.Root>
  );
}
