'use client';
import Button from '@/app/(authenticated)/components/button/Button';
import { Form } from '@/app/(authenticated)/components/form';
import { Input } from '@/app/components/input';
import { MdAdd } from 'react-icons/md';
import { Controller, useForm } from 'react-hook-form';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';
import {
  AccountPayableSearchParamProps,
  SelectStatusProps,
  accountsPayableTypeSchema,
} from '../types';
import { accountPayableSearchSchema } from '../schemas/accountPayableSearchSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomSelect from '@/app/(authenticated)/components/select/CustomSelect';
import { SelectCostCenterProps } from '../../../cost-center/types';
import { useEffect } from 'react';
import { formatDateToString } from '@/app/(authenticated)/utils/formatDate';
import { statusData } from '../data/AccountPayamentStatus';

type Props = AccountPayableSearchParamProps & {
  costCenter: SelectCostCenterProps[];
};

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

  function handleOpenModal() {
    setParam('show-modal', 'account-payable-create');
  }

  function handleSearchSubmit(data: accountsPayableTypeSchema) {
    console.log('data', data);

    const costCenterId =
      data.costCenter.value !== 0 ? data.costCenter.value : '';
    console.log(data.dateDueIniti);

    const dateDueInitial =
      data.dateDueInitial === null || data.dateDueInitial === undefined
        ? ''
        : formatDateToString(data.dateDueInitial, 'YYYY-MM-DD');

    const dateDueFinal =
      data.dateDueFinal === null || data.dateDueFinal === undefined
        ? ''
        : formatDateToString(data.dateDueFinal, 'YYYY-MM-DD');

    const params = [
      { key: 'page', value: '1' },
      { key: 'status', value: data.status.value },
      { key: 'costCenterId', value: costCenterId },
      { key: 'dateDueInitial', value: dateDueInitial },
      { key: 'dateDueFinal', value: dateDueFinal },
    ];

    setMultipleParam(params);
  }

  function clearForm() {
    deleteMultipleParam([
      'page',
      'status',
      'costCenterId',
      'dateDueInitial',
      'dateDueFinal',
    ]);
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
      const statusFiltered = statusData.find(
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
            options={statusData}
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
          <Input.InputMask
            replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
            mask={'dd/mm/aaaa'}
            {...register('dateDueInitial')}
          />
          <Input.LabelError helperText={errors.dateDueInitial?.message} />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Data venc final" />
          <Input.InputMask
            replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
            mask={'dd/mm/aaaa'}
            {...register('dateDueFinal')}
          />
          <Input.LabelError helperText={errors.dateDueFinal?.message} />
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
