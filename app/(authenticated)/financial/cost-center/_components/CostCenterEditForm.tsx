'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/app/components/input';
import Button from '../../../components/button/Button';
import { Modal } from '../../../components/modal';
import { CostCenterEditProps, costCenterTypeSchema } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModalStore } from '@/app/(authenticated)/components/modal/stores/useModalStore';
import { toast } from 'react-toastify';
import { costCenterSchema } from '../schemas/costCenterCreateSchema';
import { useEffect } from 'react';
import { updateCostCenter } from '../actions/costCenterAction';

type Props = {
  data: CostCenterEditProps;
  resetUseCostCenterStore: () => void;
};
export default function CostCenterEditForm({
  data,
  resetUseCostCenterStore,
}: Props) {
  const { toggleModal } = useModalStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CostCenterEditProps>({
    mode: 'onBlur',
    resolver: zodResolver(costCenterSchema),
  });

  async function submitCostCenterForm(dataForm: costCenterTypeSchema) {
    const updateUserResult = await updateCostCenter(dataForm, data.id);
    if (updateUserResult.status !== 204) {
      toast.error(updateUserResult.message);
      return;
    }
    toggleModal();
    resetUseCostCenterStore();
    toast.success(updateUserResult.message);
  }

  useEffect(() => {
    setValue('name', data.name);
  }, [data]);

  return (
    <>
      <Modal.Root title={'Editar Centro de custo'}>
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
