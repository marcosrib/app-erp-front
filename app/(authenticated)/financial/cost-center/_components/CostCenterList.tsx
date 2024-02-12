import { TableCustom } from '@/app/(authenticated)/components/table';
import CostCenterSearch from './CostCenterSearch';
import CostCenterButtonEdit from './CostCenterButtonEdit';
import { SearchParamProps } from '../types';

export default function CostCenterList({ searchParams }: SearchParamProps) {
  return (
    <>
      <CostCenterSearch />
      <TableCustom.Root>
        <TableCustom.Body
          params={searchParams}
          url="api/cost-center/pagination"
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
              let costCenter = JSON.parse(row);
              return (
                <TableCustom.Actions>
                  <CostCenterButtonEdit costCenterData={costCenter} />
                </TableCustom.Actions>
              );
            }}
          </TableCustom.Column>
        </TableCustom.Body>
      </TableCustom.Root>
    </>
  );
}
