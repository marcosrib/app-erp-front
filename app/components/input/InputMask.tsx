import { InputMask, Replacement } from '@react-input/mask';

import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  mask: string;
  replacement: Replacement | string;
};

export const InputMaskTag = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', name = '', ...props }, ref) => {
    return (
      <InputMask
        type={type}
        ref={ref}
        name={name}
        {...props}
        showMask
        separate
        className="border
         border-gray-300 
         text-gray-500
         sm:text-sm 
         rounded-lg 
         dark:border-opacity-25 
         dark:border 
         dark:border-white 
         dark:shadow-none 
         dark:bg-gray-700
         dark:focus:bg-gray-700
         dark:hover:bg-gray-700
         dark:text-gray-100
         focus:outline-none
         focus:ring-indigo-600
         focus:border-indigo-600
         block w-full p-2.5"
      />
    );
  }
);

InputMaskTag.displayName = 'InputMaskTag';
