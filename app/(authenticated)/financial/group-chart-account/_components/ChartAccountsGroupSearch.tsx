'use client';
import Button from '@/app/(authenticated)/components/button/Button';
import { Form } from '@/app/(authenticated)/components/form';
import { Input } from '@/app/components/input';
import {
  ChartAccountsGroupSearchProps,
  chartAccountsGroupTypeSchema,
} from '../types';
import { MdAdd } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChartAccountsGroupStore } from '../store/useChartAccountsGroupStore';
import { chartAccountsGroupSchema } from '../schemas/chartAccountsGroupSchema';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';

export default function ChartAccountsGroupSearch() {
  const { resetDataForm } = useChartAccountsGroupStore();
  const { deleteMultipleParam, setMultipleParam, setParam } = useURLParams();

  const {
    register: registerSearch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChartAccountsGroupSearchProps>({
    mode: 'onBlur',
    resolver: zodResolver(chartAccountsGroupSchema),
  });

  function handleOpenModal() {
    resetDataForm();
    setParam('show-modal', 'chart-account-group-create');
  }

  function handleSearchSubmit(data: chartAccountsGroupTypeSchema) {
    const params = [
      {
        key: 'page',
        value: '1',
      },
      {
        key: 'name',
        value: data.name,
      },
    ];
    setMultipleParam(params);
  }

  function clearForm() {
    deleteMultipleParam(['page', 'name']);
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
