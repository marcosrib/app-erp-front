'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/app/components/input';
import Button from '../../../components/button/Button';
import { Modal } from '../../../components/modal';
import { CostCenterSearchProps, costCenterTypeSchema } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModalStore } from '@/app/(authenticated)/components/modal/stores/useModalStore';
import { toast } from 'react-toastify';
import { costCenterSchema } from '../schemas/costCenterCreateSchema';
import { createCostCenter } from '../actions/costCenterAction';

export default function CostCenterCreateForm() {
  const { toggleModal } = useModalStore();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CostCenterSearchProps>({
    mode: 'onBlur',
    resolver: zodResolver(costCenterSchema),
  });

  async function submitUserForm(data: costCenterTypeSchema) {
    const costCenterResult = await createCostCenter(data);
    if (costCenterResult.status !== 201) {
      toast.error(costCenterResult.message);
      return;
    }
    toggleModal();
    toast.success(costCenterResult.message);
    reset();
  }
  return (
    <>
      <Modal.Root title={'Cadastrar Centro de custo'}>
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
