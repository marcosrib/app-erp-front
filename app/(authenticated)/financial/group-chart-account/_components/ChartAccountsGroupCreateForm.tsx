'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/app/components/input';
import Button from '../../../components/button/Button';
import { Modal } from '../../../components/modal';
import {
  ChartAccountsGroupCreateProps,
  chartAccountsGroupTypeSchema,
} from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { createChartAccountsGroup } from '../actions/chartAccountsGroupAction';
import { chartAccountsGroupSchema } from '../schemas/chartAccountsGroupSchema';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';

export default function ChartAccountsGroupCreateForm() {
  const { deleteParam, compareParam } = useURLParams();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ChartAccountsGroupCreateProps>({
    mode: 'onBlur',
    resolver: zodResolver(chartAccountsGroupSchema),
  });

  async function submitUserForm(data: chartAccountsGroupTypeSchema) {
    const charAccountGroupResult = await createChartAccountsGroup(data);
    if (charAccountGroupResult.status !== 201) {
      toast.error(charAccountGroupResult.message);
      return;
    }
    closeModal();
    toast.success(charAccountGroupResult.message);
    reset();
  }

  function closeModal() {
    deleteParam('show-modal');
  }

  return (
    <>
      <Modal.Root
        closeModal={closeModal}
        isOpen={compareParam('show-modal', 'chart-account-group-create')}
        title={'Cadastrar Grupo Plano de Contas'}
      >
        <Modal.Form onSubmit={handleSubmit(submitUserForm)}>
          <Modal.FormInputs>
            <Input.Root>
              <Input.Label label="Nome" />
              <Input.Input {...register('name')} />
              <Input.LabelError helperText={errors.name?.message} />
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
