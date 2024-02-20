import { TableCustom } from '@/app/(authenticated)/components/table';
import { SearchParamProps } from '../types';
import GroupChartAccountButtonEdit from './ChartAccountsGroupButtonEdit';
import ChartAccountsGroupSearch from './ChartAccountsGroupSearch';

export default function ChartAccountsGroupList({
  searchParams,
}: SearchParamProps) {
  return (
    <>
      <ChartAccountsGroupSearch />
      <TableCustom.Root>
        <TableCustom.Body
          params={searchParams}
          url="api/chart-accounts-group/pagination"
        >
          <TableCustom.Header>
            <TableCustom.HeaderContent title="Id" />
            <TableCustom.HeaderContent title="Nome" />
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
          <TableCustom.Column field="actions">
            {(row) => {
              let groupChartAccount = JSON.parse(row);
              return (
                <TableCustom.Actions>
                  <GroupChartAccountButtonEdit
                    groupChartAccountData={groupChartAccount}
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
