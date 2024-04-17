import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function TableHeader({ children }: Props) {
  return (
    <thead
      className="bg-white  
      dark:border-opacity-20 
      dark:border-y 
      dark:bg-gray-800
      dark:border-white">
      <tr>{children}</tr>
    </thead>
  );
}
