import { ReactNode } from 'react';

type Props = {
  field: 'combinedData' | string;
  children: (rowData: any) => ReactNode;
};
export function TableBodyColumn({ children, field }: Props) {
  return <>{children(field)}</>;
}
