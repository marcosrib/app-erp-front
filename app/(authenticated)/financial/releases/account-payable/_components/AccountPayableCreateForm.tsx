'use client';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';
import { useForm } from 'react-hook-form';
import { accountsPayableCreateTypeSchema } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountPayableCreateSchema } from '../schemas/accountPayableCreateSchema';
import { Modal } from '@/app/(authenticated)/components/modal';
import { Input } from '@/app/components/input';
import Button from '@/app/(authenticated)/components/button/Button';
import { toast } from 'react-toastify';
import { createAccountPayable } from '../actions/accountPayableAction';
import { SelectCostCenterProps } from '../../../cost-center/types';
import CustomSelect from '@/app/(authenticated)/components/select/CustomSelect';
import { statusData } from '../data/AccountPayamentStatus';
import { SelectChartAccountOptionsProps } from '../../../chart-account/types';

type Props = {
  costCenter: SelectCostCenterProps[];
  charAccounts: SelectChartAccountOptionsProps[];
};
export default function AccountPayableCreateForm({
  costCenter,
  charAccounts,
}: Props) {
  const { deleteParam, compareParam } = useURLParams();
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<accountsPayableCreateTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(accountPayableCreateSchema),
  });

  async function submitUserForm(data: accountsPayableCreateTypeSchema) {
    const accountPayableResult = await createAccountPayable(data);
    if (accountPayableResult.status !== 201) {
      toast.error(accountPayableResult.message);
      return;
    }
    deleteParam('show-modal');
    toast.success(accountPayableResult.message);
    reset();
  }
  console.log(errors);

  return (
    <>
      <Modal.Root
        closeModal={() => deleteParam('show-modal')}
        isOpen={compareParam('show-modal', 'account-payable-create')}
        title={'Cadastrar contas a pagar'}
        sizeScreen={'max-w-4xl'}
      >
        <Modal.Form onSubmit={handleSubmit(submitUserForm)}>
          <Modal.FormInputs>
            <Input.Root>
              <Input.Label label="Valor" />
              <Input.Input {...register('value')} />
              <Input.LabelError helperText={errors.value?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Status" />
              <CustomSelect
                defaultValue={''}
                defaultLabel="Selecione status"
                name="status"
                control={control}
                options={statusData}
              />
              <Input.LabelError helperText={errors.status?.value?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Centro de custo" />
              <CustomSelect
                defaultValue={0}
                defaultLabel="Selecione centro de custo"
                name="costCenter"
                isSearchable={true}
                control={control}
                options={costCenter}
              />
              <Input.LabelError
                helperText={errors.costCenter?.value?.message}
              />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Plano de contas" />
              <CustomSelect
                defaultValue={0}
                defaultLabel="Selecione plano de contas"
                name="chartAccount"
                isSearchable={true}
                control={control}
                options={charAccounts}
              />
              <Input.LabelError
                helperText={errors.chartAccount?.value?.message}
              />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Data vencimento" />
              <Input.InputMask
                replacement={{ _: /\d/ }}
                mask={'__/__/____'}
                {...register('dateDue')}
              />
              <Input.LabelError helperText={errors.dateDue?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Data vencimento" />
              <Input.InputMask
                replacement={{ _: /\d/ }}
                mask={'__/__/____'}
                {...register('dateDue')}
              />
              <Input.LabelError helperText={errors.dateDue?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Data vencimento" />
              <Input.InputMask
                replacement={{ _: /\d/ }}
                mask={'__/__/____'}
                {...register('dateDue')}
              />
              <Input.LabelError helperText={errors.dateDue?.message} />
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
