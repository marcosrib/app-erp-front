'use client';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Modal } from '@/app/(authenticated)/components/modal';
import { Input } from '@/app/components/input';
import Button from '@/app/(authenticated)/components/button/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  ChartAccountEditProps,
  SelectTypeOptionsProps,
  chartAccountTypeSchema,
} from '../types';
import { chartAccountSchema } from '../schemas/chartAccountSchema';
import { updateChartAccount } from '../actions/chartAccountAction';
import CustomSelect from '@/app/(authenticated)/components/select/CustomSelect';

type Props = {
  data: ChartAccountEditProps;
  resetChartAccountStore: () => void;
};
export default function ChartAccountEditForm({
  data,
  resetChartAccountStore,
}: Props) {
  const router = useRouter();
  const searcheParams = useSearchParams();
  const pathName = usePathname();

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
    console.log(dataForm);

    /*const updateUserResult = await updateChartAccount(dataForm, data.id);
    if (updateUserResult.status !== 204) {
      toast.error(updateUserResult.message);
      return;
    }
    closeModal();
    resetChartAccountStore();
    toast.success(updateUserResult.message);*/
  }

  function closeModal() {
    const params = new URLSearchParams(searcheParams.toString());
    params.delete('showModal');
    router.push(`${pathName}/?${params.toString()}`);
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
  }, [data]);

  return (
    <>
      <Modal.Root
        closeModal={closeModal}
        isOpen={searcheParams.get('showModal') === 'chartaccountedit'}
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
          </Modal.FormInputs>
          <Modal.FormFooter>
            <Button label={'Editar'} color="search" type="submit" />
          </Modal.FormFooter>
        </Modal.Form>
      </Modal.Root>
    </>
  );
}
