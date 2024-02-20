'use client';
import Button from '@/app/(authenticated)/components/button/Button';
import { Form } from '@/app/(authenticated)/components/form';
import { useModalStore } from '@/app/(authenticated)/components/modal/stores/useModalStore';
import { Input } from '@/app/components/input';
import {
  ChartAccountsGroupProps,
  chartAccountsGroupTypeSchema,
} from '../types';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { MdAdd } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChartAccountsGroupStore } from '../store/useChartAccountsGroupStore';
import { chartAccountsGroupSchema } from '../schemas/chartAccountsGroupSchema';

export default function ChartAccountsGroupSearch() {
  const { toggleModal } = useModalStore();
  const { resetDataForm } = useChartAccountsGroupStore();
  const router = useRouter();
  const searcheParams = useSearchParams();
  const pathName = usePathname();

  const {
    register: registerSearch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChartAccountsGroupProps>({
    mode: 'onBlur',
    resolver: zodResolver(chartAccountsGroupSchema),
  });

  function handleOpenModal() {
    resetDataForm();
    toggleModal();
  }

  function handleSearchSubmit(data: chartAccountsGroupTypeSchema) {
    const params = new URLSearchParams(searcheParams.toString());
    params.set('page', '1');
    params.set('name', data.name);
    router.push(`${pathName}/?${params.toString()}`);
  }

  function clearForm() {
    const params = new URLSearchParams(searcheParams.toString());
    params.delete('page');
    params.delete('name');
    router.push(`${pathName}/?${params.toString()}`);
    reset();
  }
  return (
    <Form.Root
      title="Grupo plano de custo"
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
