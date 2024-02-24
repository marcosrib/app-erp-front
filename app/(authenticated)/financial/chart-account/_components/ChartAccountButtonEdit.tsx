'use client';
import { TableCustom } from '@/app/(authenticated)/components/table';
import { FiEdit } from 'react-icons/fi';
import { ChartAccountEditProps } from '../types';
import { useChartAccountStore } from '../store/useChartAccountStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  chartAccountData: ChartAccountEditProps;
};

export default function ChartAccountButtonEdit({ chartAccountData }: Props) {
  const router = useRouter();
  const searcheParams = useSearchParams();
  const pathName = usePathname();
  const { addChartAccountEdit } = useChartAccountStore();

  function handleEditChartAccount(data: ChartAccountEditProps) {
    addChartAccountEdit(data);
    openModal();
  }

  function openModal() {
    const params = new URLSearchParams(searcheParams.toString());
    params.set('showModal', 'chartaccountedit');
    router.push(`${pathName}/?${params.toString()}`);
  }

  return (
    <TableCustom.Button
      data={chartAccountData}
      onClick={handleEditChartAccount}
      color={'edit'}
    >
      <TableCustom.Icon icon={<FiEdit color={'white'} size={16} />} />
    </TableCustom.Button>
  );
}
