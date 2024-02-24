'use client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/app/(authenticated)/components/modal';
import { Input } from '@/app/components/input';
import Button from '@/app/(authenticated)/components/button/Button';
import {
  ChartAccountEditProps,
  SelectTypeOptionsProps,
  chartAccountTypeSchema,
} from '../types';
import { chartAccountSchema } from '../schemas/chartAccountSchema';
import { updateChartAccount } from '../actions/chartAccountAction';
import CustomSelect from '@/app/(authenticated)/components/select/CustomSelect';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';
import { SelectChartAccountsGroupProps } from '../../group-chart-account/types';

type Props = {
  data: ChartAccountEditProps;
  resetChartAccountStore: () => void;
  chartAccountsGroupData: SelectChartAccountsGroupProps[];
};
export default function ChartAccountEditForm({
  data,
  chartAccountsGroupData,
  resetChartAccountStore,
}: Props) {
  const { deleteParam, compareParam } = useURLParams();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<chartAccountTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(chartAccountSchema),
  });

  async function submitChartAccountForm(dataForm: chartAccountTypeSchema) {
    const updateChartAccountResult = await updateChartAccount(
      dataForm,
      data.id
    );
    if (updateChartAccountResult.status !== 204) {
      toast.error(updateChartAccountResult.message);
      return;
    }
    deleteParam('show-modal');
    resetChartAccountStore();
    toast.success(updateChartAccountResult.message);
  }

  const types = [
    { value: 'EXPENSE', label: 'Despesa' },
    { value: 'REVENUE', label: 'Receita' },
  ] as SelectTypeOptionsProps[];

  useEffect(() => {
    setValue('name', data.name);

    setValue('type', {
      value: data.type?.value,
      label: data.type?.label,
    });
    setValue('chartAccountsGroup', {
      value: data.chartAccountsGroup?.id,
      label: data.chartAccountsGroup?.name,
    });
  }, [data]);

  return (
    <>
      <Modal.Root
        closeModal={() => deleteParam('show-modal')}
        isOpen={compareParam('show-modal', 'chart-account-edit')}
        title={'Editar Plano de Contas'}
      >
        <Modal.Form onSubmit={handleSubmit(submitChartAccountForm)}>
          <Modal.FormInputs>
            <Input.Root>
              <Input.Label label="Nome" />
              <Input.Input {...register('name')} />
              <Input.LabelError helperText={errors.name?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Tipo" />
              <CustomSelect name="type" options={types} control={control} />
              <Input.LabelError helperText={errors.type?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Grupo plano conta" />
              <CustomSelect
                name="chartAccountsGroup"
                options={chartAccountsGroupData}
                control={control}
              />
              <Input.LabelError
                helperText={errors.chartAccountsGroup?.message}
              />
            </Input.Root>
          </Modal.FormInputs>
          <Modal.FormFooter>
            <Button label={'Editar'} color="search" type="submit" />
          </Modal.FormFooter>
        </Modal.Form>
      </Modal.Root>
    </>
  );
}
