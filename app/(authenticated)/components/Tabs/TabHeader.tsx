'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Children,
  ReactNode,
  cloneElement,
} from 'react';

type Props = {
  children: ReactNode;
};
type ChildProps = {
  props: { children: string };
};

export function TabHeader({ children }: Props) {
  const router = useRouter();
  const searcheParams = useSearchParams();
  const pathName = usePathname();

  function setActiveTab(child: ChildProps, index: number) {
    const params = new URLSearchParams(searcheParams.toString());
    params.set('label', child.props.children);
    params.set('tabIndex', index.toString());
    router.push(`${pathName}/?${params.toString()}`);
  }
  return (
    <div className="flex">
      {Children.map(children, (child, index) =>
        cloneElement(child as React.ReactElement, {
          onClick: () => setActiveTab(child as ChildProps, index),
        })
      )}
    </div>
  );
}
