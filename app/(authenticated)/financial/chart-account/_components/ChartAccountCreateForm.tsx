'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/app/components/input';
import Button from '../../../components/button/Button';
import { Modal } from '../../../components/modal';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { SelectChartAccountsGroupProps } from '../../group-chart-account/types';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';
import { chartAccountTypeSchema } from '../types';
import { chartAccountSchema } from '../schemas/chartAccountSchema';
import { createChartAccount } from '../actions/chartAccountAction';
import CustomSelect from '@/app/(authenticated)/components/select/CustomSelect';
import { types } from '../data/ChartAccountType';
type Props = {
  chartAccountsGroupData: SelectChartAccountsGroupProps[];
};
export default function ChartAccountCreateForm({
  chartAccountsGroupData,
}: Props) {
  const { deleteParam, compareParam } = useURLParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<chartAccountTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(chartAccountSchema),
  });

  async function submitChartAccountForm(dataForm: chartAccountTypeSchema) {
    const createChartAccountResult = await createChartAccount(dataForm);
    if (createChartAccountResult.status !== 201) {
      toast.error(createChartAccountResult.message);
      return;
    }
    deleteParam('show-modal');
    toast.success(createChartAccountResult.message);
  }

  return (
    <>
      <Modal.Root
        closeModal={() => deleteParam('show-modal')}
        isOpen={compareParam('show-modal', 'chart-account-create')}
        title={'Cadastrar Plano de Contas'}
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
              <CustomSelect
                defaultValue={''}
                defaultLabel="Selecione o tipo"
                name="type"
                options={types}
                control={control}
              />
              <Input.LabelError helperText={errors.type?.value?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Grupo plano conta" />
              <CustomSelect
                defaultValue={0}
                defaultLabel="Selecione o grupo plano conta"
                name="chartAccountsGroup"
                options={chartAccountsGroupData}
                control={control}
              />
              <Input.LabelError
                helperText={errors.chartAccountsGroup?.value?.message}
              />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Grupo plano conta" />
              <CustomSelect
                defaultValue={0}
                defaultLabel="Selecione o grupo plano conta"
                name="chartAccountsGroup"
                options={chartAccountsGroupData}
                control={control}
              />
              <Input.LabelError
                helperText={errors.chartAccountsGroup?.value?.message}
              />
            </Input.Root>
          </Modal.FormInputs>
          <Modal.FormFooter>
            <Button label={'Cadastrar'} color="search" type="submit" />
          </Modal.FormFooter>
        </Modal.Form>
      </Modal.Root>
    </>
  );
}
