'use client';
import Button from '@/app/(authenticated)/components/button/Button';
import { Form } from '@/app/(authenticated)/components/form';
import { Input } from '@/app/components/input';
import { MdAdd } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';
import { accountsPayableTypeSchema } from '../types';
import { accountPayableSearchSchema } from '../schemas/accountPayableSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function AccountPayableSearch() {
  const { setMultipleParam, setParam, deleteMultipleParam } = useURLParams();
  const {
    register: registerSearch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<accountsPayableTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(accountPayableSearchSchema),
  });

  function handleOpenModal() {
    setParam('show-modal', 'account-payable-create');
  }

  function handleSearchSubmit(data: accountsPayableTypeSchema) {
    const params = [
      { key: 'page', value: '1' },
      { key: 'status', value: data?.status },
      { key: 'costCenter', value: data?.costCenter },
    ];
    setMultipleParam(params);
  }

  function clearForm() {
    deleteMultipleParam(['page', 'status', 'costCenter']);
    reset();
  }
  return (
    <Form.Root
      title="Contas a pagar"
      onSubmit={handleSubmit(handleSearchSubmit)}
    >
      <Form.InputContainer>
        <Input.Root>
          <Input.Label label="Status" />
          <Input.Input {...registerSearch('status')} />
          <Input.LabelError helperText={errors.status?.message} />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Centro de custo" />
          <Input.Input {...registerSearch('costCenter')} />
          <Input.LabelError helperText={errors.costCenter?.message} />
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
