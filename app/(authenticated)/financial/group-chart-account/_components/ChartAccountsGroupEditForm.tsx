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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  data: ChartAccountsGroupEditProps;
  resetChartAccountsGroupStore: () => void;
};
export default function ChartAccountsGroupEditForm({
  data,
  resetChartAccountsGroupStore,
}: Props) {
  const router = useRouter();
  const searcheParams = useSearchParams();
  const pathName = usePathname();

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
    const updateUserResult = await updateChartAccountsGroup(dataForm, data.id);
    if (updateUserResult.status !== 204) {
      toast.error(updateUserResult.message);
      return;
    }
    closeModal();
    resetChartAccountsGroupStore();
    toast.success(updateUserResult.message);
  }

  function closeModal() {
    const params = new URLSearchParams(searcheParams.toString());
    params.delete('showModal');
    router.push(`${pathName}/?${params.toString()}`);
  }

  useEffect(() => {
    setValue('name', data.name);
  }, [data]);

  return (
    <>
      <Modal.Root
        closeModal={closeModal}
        isOpen={searcheParams.get('showModal') === 'acgedit'}
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
