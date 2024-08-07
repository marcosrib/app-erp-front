import { ReactNode } from 'react';

type Props = {
  children: {
    [key: number]: ReactNode;
  };
  searchParams: { tabIndex: number };
};
export function TabContent({ searchParams, children }: Props) {
  let index = searchParams.tabIndex ? searchParams.tabIndex : 0;
  return <div className="p-4 bg-gray-50 dark:bg-gray-800  dark:border-opacity-20 
  dark:border 
  dark:border-white ">{children[index]}</div>;
}
