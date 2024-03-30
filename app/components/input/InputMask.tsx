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
         focus:border-2
         focus:outline-none
         focus:ring-gray-300
         focus:border-gray-300
         block w-full p-2"
      />
    );
  }
);

InputMaskTag.displayName = 'InputMaskTag';
