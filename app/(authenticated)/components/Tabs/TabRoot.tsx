import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function TabRoot({ children }: Props) {
  return <div className="w-3/3 mx-auto mt-8 ml-10">{children}</div>;
}
