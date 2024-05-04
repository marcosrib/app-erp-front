import { TableCustom } from '@/app/(authenticated)/components/table';
import { AccountPayableSearchParamProps } from '../types';
import Badge from '@/app/(authenticated)/components/badges/Badge';
import { format } from 'path';
import { formatCurrencyValue } from '@/app/(authenticated)/utils/formatCurrency';

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
            <TableCustom.HeaderContent title="Data pgto." />
            <TableCustom.HeaderContent title="Data venc." />
            <TableCustom.HeaderContent title="Status" />
            <TableCustom.HeaderContent title="Ações" />
          </TableCustom.Header>
          <TableCustom.Column field="id">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="value">
            {(field) => {
              return <p>R$ {formatCurrencyValue(field)}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="combinedData">
            {(field) => {
              return <p>{JSON.parse(field).chartAccount.name}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="combinedData">
            {(field) => {
              return <p>{JSON.parse(field).costCenter.name}</p>;
            }}
          </TableCustom.Column>

          <TableCustom.Column field="paymentDate">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="dueDate">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="combinedData">
            {(field) => {
              const status = JSON.parse(field).status;
              const dueDate = new Date(JSON.parse(field).dueDate);
              const currentDate = new Date();
              if (dueDate < currentDate && status.value === 'PENDING')
                return <Badge bgColor="error" title="Vencido" />;
              if (status.value === 'PAID')
                return <Badge bgColor="success" title={status.label} />;
              if (status.value === 'PENDING')
                return <Badge bgColor="warn" title={status.label} />;
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
