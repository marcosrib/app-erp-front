import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  label: string;
};
export function NavMenu({ children, label }: Props) {
  return (
    <div>
      <div className="w-full flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200  bg-white shadow-lg shadow-gray-200 hover:!bg-white  group transition-all duration-200">
        <p>{label}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
