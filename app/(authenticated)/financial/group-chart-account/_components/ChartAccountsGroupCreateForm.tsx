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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ChartAccountsGroupCreateForm() {
  const router = useRouter();
  const searcheParams = useSearchParams();
  const pathName = usePathname();

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
    const costCenterResult = await createChartAccountsGroup(data);
    if (costCenterResult.status !== 201) {
      toast.error(costCenterResult.message);
      return;
    }
    closeModal();
    toast.success(costCenterResult.message);
    reset();
  }

  function closeModal() {
    const params = new URLSearchParams(searcheParams.toString());
    params.delete('showModal');
    router.push(`${pathName}/?${params.toString()}`);
  }

  return (
    <>
      <Modal.Root
        closeModal={closeModal}
        isOpen={searcheParams.get('showModal') === 'acgcreate'}
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
