'use client';
import { TableCustom } from '@/app/(authenticated)/components/table';
import { FiEdit } from 'react-icons/fi';
import { ChartAccountEditProps } from '../types';
import { useChartAccountStore } from '../store/useChartAccountStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';

type Props = {
  chartAccountData: ChartAccountEditProps;
};

export default function ChartAccountButtonEdit({ chartAccountData }: Props) {
  const { setParam } = useURLParams();
  const { addChartAccountEdit } = useChartAccountStore();

  function handleEditChartAccount(data: ChartAccountEditProps) {
    addChartAccountEdit(data);
    openModal();
  }

  function openModal() {
    setParam('show-modal', 'chart-account-edit');
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
