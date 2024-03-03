import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  column?: 3 | 4 | 5 | 6;
};

export function ModalFormInputs({ column, children }: Props) {
  return (
    <div className="p-6 space-y-6">
      <div
        className={clsx(
          'grid grid-cols-1 gap-2',
          column === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2',
          column === 4 ? 'md:grid-cols-4' : 'md:grid-cols-2',
          column === 5 ? 'md:grid-cols-5' : 'md:grid-cols-2',
          column === 5 ? 'md:grid-cols-6' : 'md:grid-cols-2'
        )}
      >
        {children}
      </div>
    </div>
  );
}
