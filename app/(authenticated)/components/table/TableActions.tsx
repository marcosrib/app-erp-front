'use client';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function TableActions({ children }: Props) {
  return <td className="px-4 space-x-2 whitespace-nowrap">{children}</td>;
}
