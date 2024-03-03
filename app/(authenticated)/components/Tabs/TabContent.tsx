import { ReactNode } from 'react';

type Props = {
  children: {
    [key: number]: ReactNode;
  };
  searchParams: { tabIndex: number };
};
export function TabContent({ searchParams, children }: Props) {
  let index = searchParams.tabIndex ? searchParams.tabIndex : 0;
  return <div className="p-4 w-dvw bg-gray-50">{children[index]}</div>;
}
