import { TableCustom } from '@/app/(authenticated)/components/table';
import { ChartAccountSearchParamProps } from '../types';
import ChartAccountButtonEdit from './ChartAccountButtonEdit';
import ChartAccountForm from './ChartAccountForm';
import { getChartAccountsGroup } from '../../group-chart-account/actions/chartAccountsGroupAction';

export default async function ChartAccountList({
  searchParams,
}: ChartAccountSearchParamProps) {
  const chartAccountsGroupData = await getChartAccountsGroup();

  return (
    <>
      <ChartAccountForm chartAccountsGroupData={chartAccountsGroupData} />
      <TableCustom.Root>
        <TableCustom.Body
          params={searchParams}
          url="api/chart-account/pagination"
        >
          <TableCustom.Header>
            <TableCustom.HeaderContent title="Id" />
            <TableCustom.HeaderContent title="Nome" />
            <TableCustom.HeaderContent title="Tipo" />
            <TableCustom.HeaderContent title="Grupo" />
            <TableCustom.HeaderContent title="Ações" />
          </TableCustom.Header>
          <TableCustom.Column field="id">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="name">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="combinedData">
            {(field) => {
              return <p>{JSON.parse(field).type.label}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="combinedData">
            {(field) => {
              return <p>{JSON.parse(field).chartAccountsGroup.name}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="actions">
            {(row) => {
              let groupChartAccount = JSON.parse(row);
              return (
                <TableCustom.Actions>
                  <ChartAccountButtonEdit
                    chartAccountData={groupChartAccount}
                  />
                </TableCustom.Actions>
              );
            }}
          </TableCustom.Column>
        </TableCustom.Body>
      </TableCustom.Root>
    </>
  );
}