import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function ModalFormFooter({ children }: Props) {
  return (
    <div className="items-center p-6 rounded-b border-t border-gray-200">
      {children}
    </div>
  );
}
