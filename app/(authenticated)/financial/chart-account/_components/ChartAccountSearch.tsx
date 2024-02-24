'use client';
import Button from '@/app/(authenticated)/components/button/Button';
import { Form } from '@/app/(authenticated)/components/form';
import { Input } from '@/app/components/input';
import { MdAdd } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChartAccountStore } from '../store/useChartAccountStore';
import { chartAccountFilterTypeSchema } from '../types';
import { chartAccountFilterSchema } from '../schemas/chartAccountSchema';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';

export default function ChartAccountSearch() {
  const { resetDataForm } = useChartAccountStore();
  const { setMultipleParam, setParam, deleteMultipleParam } = useURLParams();
  const {
    register: registerSearch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<chartAccountFilterTypeSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(chartAccountFilterSchema),
  });

  function handleOpenModal() {
    resetDataForm();
    setParam('show-modal', 'chart-account-create');
  }

  function handleSearchSubmit(data: chartAccountFilterTypeSchema) {
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
