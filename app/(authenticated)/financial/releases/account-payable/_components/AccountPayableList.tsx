import { TableCustom } from '@/app/(authenticated)/components/table';
import { AccountPayableSearchParamProps } from '../types';

export default async function AccountPayableList({
  searchParams,
}: AccountPayableSearchParamProps) {
  return (
    <>
      <TableCustom.Root>
        <TableCustom.Body
          params={searchParams}
          url="api/account-payable/pagination"
        >
          <TableCustom.Header>
            <TableCustom.HeaderContent title="Id" />
            <TableCustom.HeaderContent title="Valor" />
            <TableCustom.HeaderContent title="Plano de contas" />
            <TableCustom.HeaderContent title="Centro de custo" />
            <TableCustom.HeaderContent title="Status" />
            <TableCustom.HeaderContent title="Data pgto." />
            <TableCustom.HeaderContent title="Data venc." />
            <TableCustom.HeaderContent title="Ações" />
          </TableCustom.Header>
          <TableCustom.Column field="id">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="value">
            {(field) => {
              return <p>R$ {field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="combinedData">
            {(field) => {
              return <p>{JSON.parse(field).chartAccountResponse.name}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="combinedData">
            {(field) => {
              return <p>{JSON.parse(field).costCenterResponse.name}</p>;
            }}
          </TableCustom.Column>

          <TableCustom.Column field="paymentDate">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="dueDate">
            {(field) => {
              console.log(field);

              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="status">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="actions">
            {(row) => {
              let AccountPayable = JSON.parse(row);
              return (
                <TableCustom.Actions>
                  <></>
                </TableCustom.Actions>
              );
            }}
          </TableCustom.Column>
        </TableCustom.Body>
      </TableCustom.Root>
    </>
  );
}
