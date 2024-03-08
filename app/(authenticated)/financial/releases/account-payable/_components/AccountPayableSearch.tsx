'use client';
import Button from '@/app/(authenticated)/components/button/Button';
import { Form } from '@/app/(authenticated)/components/form';
import { Input } from '@/app/components/input';
import { MdAdd } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';
import {
  AccountPayableSearchParamProps,
  accountsPayableTypeSchema,
} from '../types';
import { accountPayableSearchSchema } from '../schemas/accountPayableSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomSelect from '@/app/(authenticated)/components/select/CustomSelect';
import { SelectCostCenterProps } from '../../../cost-center/types';
import { useEffect } from 'react';
type Props = AccountPayableSearchParamProps & {
  costCenter: SelectCostCenterProps[];
};
export default function AccountPayableSearch({
  costCenter,
  searchParams,
}: Props) {
  const { setMultipleParam, setParam, deleteMultipleParam } = useURLParams();
  const {
    register: registerSearch,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<accountsPayableTypeSchema>({
    resolver: zodResolver(accountPayableSearchSchema),
  });

  function handleOpenModal() {
    setParam('show-modal', 'account-payable-create');
  }

  function handleSearchSubmit(data: accountsPayableTypeSchema) {
    console.log('search', data);
    const costCenterId =
      data.costCenter.value !== 0 ? data.costCenter.value : '';

    const params = [
      { key: 'page', value: '1' },
      { key: 'status', value: '' },
      { key: 'costCenterId', value: costCenterId },
    ];

    setMultipleParam(params);
  }

  function clearForm() {
    deleteMultipleParam(['page', 'status', 'costCenterId']);
    reset();
  }

  useEffect(() => {
    console.log(
      costCenter.filter(
        (costCenter) => costCenter.value === searchParams?.costCenterId
      )
    );
    if (searchParams?.costCenterId) {
      // setValue('costCenterId', searchParams.costCenterId);
    }
  }, [searchParams]);
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
          <CustomSelect
            defaultValue={0}
            defaultLabel="Selecione centro de custo"
            name="costCenter"
            isSearchable={true}
            control={control}
            options={costCenter}
          />
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
