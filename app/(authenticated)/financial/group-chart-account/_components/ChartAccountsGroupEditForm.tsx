'use client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChartAccountsGroupEditProps,
  chartAccountsGroupTypeSchema,
} from '../types';
import { chartAccountsGroupSchema } from '../schemas/chartAccountsGroupSchema';
import { Modal } from '@/app/(authenticated)/components/modal';
import { Input } from '@/app/components/input';
import Button from '@/app/(authenticated)/components/button/Button';
import { updateChartAccountsGroup } from '../actions/chartAccountsGroupAction';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';

type Props = {
  data: ChartAccountsGroupEditProps;
  resetChartAccountsGroupStore: () => void;
};
export default function ChartAccountsGroupEditForm({
  data,
  resetChartAccountsGroupStore,
}: Props) {
  const { deleteParam, compareParam } = useURLParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ChartAccountsGroupEditProps>({
    mode: 'onBlur',
    resolver: zodResolver(chartAccountsGroupSchema),
  });

  async function submitCostCenterForm(dataForm: chartAccountsGroupTypeSchema) {
    const charAccountGroupResult = await updateChartAccountsGroup(
      dataForm,
      data.id
    );
    if (charAccountGroupResult.status !== 204) {
      toast.error(charAccountGroupResult.message);
      return;
    }
    deleteParam('show-modal');
    resetChartAccountsGroupStore();
    toast.success(charAccountGroupResult.message);
  }

  useEffect(() => {
    setValue('name', data.name);
  }, [data]);

  return (
    <>
      <Modal.Root
        closeModal={() => deleteParam('show-modal')}
        isOpen={compareParam('show-modal', 'chart-account-group-edit')}
        title={'Editar Grupo Plano de Contas'}
      >
        <Modal.Form onSubmit={handleSubmit(submitCostCenterForm)}>
          <Modal.FormInputs>
            <Input.Root>
              <Input.Label label="Nome" />
              <Input.Input {...register('name')} />
              <Input.LabelError helperText={errors.name?.message} />
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
