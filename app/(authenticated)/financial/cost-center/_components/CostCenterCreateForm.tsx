'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/app/components/input';
import Button from '../../../components/button/Button';
import { Modal } from '../../../components/modal';
import { CostCenterCreateProps, costCenterTypeSchema } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { costCenterSchema } from '../schemas/costCenterCreateSchema';
import { createCostCenter } from '../actions/costCenterAction';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';

export default function CostCenterCreateForm() {
  const { deleteParam, compareParam } = useURLParams();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CostCenterCreateProps>({
    mode: 'onBlur',
    resolver: zodResolver(costCenterSchema),
  });

  async function submitUserForm(data: costCenterTypeSchema) {
    const costCenterResult = await createCostCenter(data);
    if (costCenterResult.status !== 201) {
      toast.error(costCenterResult.message);
      return;
    }
    deleteParam('show-modal');
    toast.success(costCenterResult.message);
    reset();
  }
  return (
    <>
      <Modal.Root
        closeModal={() => deleteParam('show-modal')}
        isOpen={compareParam('show-modal', 'cost-center-create')}
        title={'Cadastrar Centro de custo'}
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
