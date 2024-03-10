'use client';
import Button from '@/app/(authenticated)/components/button/Button';
import { Form } from '@/app/(authenticated)/components/form';
import { Input } from '@/app/components/input';
import { MdAdd } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';
import {
  AccountPayableSearchParamProps,
  SelectStatusProps,
  accountsPayableTypeSchema,
} from '../types';
import { accountPayableSearchSchema } from '../schemas/accountPayableSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomSelect from '@/app/(authenticated)/components/select/CustomSelect';
import { SelectCostCenterProps } from '../../../cost-center/types';
import { useEffect, useState } from 'react';
import { useHookFormMask } from 'use-mask-input';

type Props = AccountPayableSearchParamProps & {
  costCenter: SelectCostCenterProps[];
};

const statusArray = [
  { value: 'PENDING', label: 'Pendente' },
  { value: 'PAID', label: 'Pago' },
];

export default function AccountPayableSearch({
  costCenter,
  searchParams,
}: Props) {
  const { setMultipleParam, setParam, deleteMultipleParam } = useURLParams();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<accountsPayableTypeSchema>({
    resolver: zodResolver(accountPayableSearchSchema),
  });

  const registerWithMask = useHookFormMask(register);

  const [value, setValued] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  function handleOpenModal() {
    setParam('show-modal', 'account-payable-create');
  }

  function handleSearchSubmit(data: accountsPayableTypeSchema) {
    console.log('form data', data);

    const costCenterId =
      data.costCenter.value !== 0 ? data.costCenter.value : '';

    const params = [
      { key: 'page', value: '1' },
      { key: 'status', value: data.status.value },
      { key: 'costCenterId', value: costCenterId },
    ];

    setMultipleParam(params);
  }

  function clearForm() {
    deleteMultipleParam(['page', 'status', 'costCenterId']);
    reset();
  }

  useEffect(() => {
    setDefaultCostcenter();
    setDefaultStatus();
  }, [searchParams]);

  function setDefaultCostcenter() {
    if (searchParams?.costCenterId) {
      const costCenterFiltered = costCenter.find(
        (costCenter) => costCenter.value == searchParams?.costCenterId
      ) as SelectCostCenterProps;
      setValue('costCenter', costCenterFiltered);
    }
  }
  function setDefaultStatus() {
    if (searchParams?.costCenterId) {
      const statusFiltered = statusArray.find(
        (status) => status.value === searchParams?.status
      ) as SelectStatusProps;
      setValue('status', statusFiltered);
    }
  }

  return (
    <Form.Root
      title="Contas a pagar"
      onSubmit={handleSubmit(handleSearchSubmit)}
    >
      <Form.InputContainer>
        <Input.Root>
          <Input.Label label="Status" />
          <CustomSelect
            defaultValue={'NONE'}
            defaultLabel="Selecione status"
            name="status"
            control={control}
            options={statusArray}
          />
          <Input.LabelError helperText={errors.costCenter?.message} />
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
        <Input.Root>
          <Input.Label label="Data venc inicial" />
          <Input.Input
            type="text"
            placeholder="dd/mm/yyyy"
            {...registerWithMask('dateVencInitial', 'datetime', {
              inputFormat: 'dd/mm/yyyy',
              required: true,
            })}
          />
          <Input.LabelError helperText={errors.dateVencInitial?.message} />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Data venc final" />
          <Input.Input
            type="text"
            placeholder="dd/mm/yyyy"
            {...registerWithMask('dateVencFinal', 'datetime', {
              inputFormat: 'dd/mm/yyyy',
              required: true,
            })}
          />
          <Input.LabelError helperText={errors.dateVencInitial?.message} />
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
