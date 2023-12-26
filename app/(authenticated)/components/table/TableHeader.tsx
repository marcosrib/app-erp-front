import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function TableHeader({ children }: Props) {
  return (
    <thead className="bg-white">
      <tr>{children}</tr>
    </thead>
  );
}
