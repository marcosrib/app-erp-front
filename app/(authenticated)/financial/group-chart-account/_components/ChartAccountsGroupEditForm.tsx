import { useForm } from 'react-hook-form';
import {
  ChartAccountsGroupEditProps,
  chartAccountsGroupTypeSchema,
} from '../types';
import { chartAccountsGroupSchema } from '../schemas/chartAccountsGroupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModalStore } from '@/app/(authenticated)/components/modal/stores/useModalStore';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Modal } from '@/app/(authenticated)/components/modal';
import { Input } from '@/app/components/input';
import Button from '@/app/(authenticated)/components/button/Button';
import { updateChartAccountsGroup } from '../actions/chartAccountsGroupAction';

type Props = {
  data: ChartAccountsGroupEditProps;
  resetChartAccountsGroupStore: () => void;
};
export default function ChartAccountsGroupEditForm({
  data,
  resetChartAccountsGroupStore,
}: Props) {
  const { toggleModal } = useModalStore();

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
    toggleModal();
    resetChartAccountsGroupStore();
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
