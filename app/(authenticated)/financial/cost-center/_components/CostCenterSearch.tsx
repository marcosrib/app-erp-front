'use client';
import Button from '@/app/(authenticated)/components/button/Button';
import { Form } from '@/app/(authenticated)/components/form';
import { useModalStore } from '@/app/(authenticated)/components/modal/stores/useModalStore';
import { useUserStore } from '@/app/(authenticated)/register/user/store/useUserStore';
import { Input } from '@/app/components/input';
import { CostCenterSearchProps, costCenterTypeSchema } from '../types';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { MdAdd } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { costCenterSchema } from '../schemas/costCenterCreateSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CostCenterSearch() {
  const { toggleModal } = useModalStore();
  const { resetDataForm } = useUserStore();
  const router = useRouter();
  const searcheParams = useSearchParams();
  const pathName = usePathname();

  const {
    register: registerSearch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CostCenterSearchProps>({
    mode: 'onBlur',
    resolver: zodResolver(costCenterSchema),
  });

  function handleOpenModal() {
    resetDataForm();
    console.log('kçç');

    toggleModal();
  }

  function handleSearchSubmit(data: costCenterTypeSchema) {
    const params = new URLSearchParams(searcheParams.toString());
    params.set('page', '1');
    params.set('name', data.name);
    router.push(`${pathName}/?${params.toString()}`);
  }

  function clearForm() {
    reset();
  }
  return (
    <Form.Root
      title="Centro de custo"
      onSubmit={handleSubmit(handleSearchSubmit)}
    >
      <Form.InputContainer>
        <Input.Root>
          <Input.Label label="Nome" />
          <Input.Input {...registerSearch('name')} />
          <Input.LabelError helperText={errors.name?.message} />
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
