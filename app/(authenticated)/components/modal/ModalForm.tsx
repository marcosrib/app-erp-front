import { ComponentProps, ReactNode } from 'react';

type Props = ComponentProps<'form'> & {
  children: ReactNode;
};

export function ModalForm({ children, ...props }: Props) {
  return <form {...props}>{children}</form>;
}
