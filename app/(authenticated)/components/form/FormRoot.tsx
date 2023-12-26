import { ComponentProps, ReactNode } from 'react';

type Props = ComponentProps<'form'> & {
  children: ReactNode;
  title: string;
};

export function FormRoot({ children, title, ...props }: Props) {
  return (
    <form
      {...props}
      className="block items-center p-4 mx-4 mt-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:p-5 sm:flex"
    >
      <div className="mb-1 w-full">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            {title}
          </h1>
        </div>
        {children}
      </div>
    </form>
  );
}
