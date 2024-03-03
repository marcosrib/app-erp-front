import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function TabRoot({ children }: Props) {
  return <div className=" w-11/13 mt-8 ml-10">{children}</div>;
}
