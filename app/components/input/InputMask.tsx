import { InputMask, Replacement } from '@react-input/mask';
import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  mask: string;
  replacement: Replacement | string;
};

export const InputMaskTag = forwardRef<HTMLInputElement, InputProps>(
  ({ mask, replacement, type = 'text', name = '', ...props }, ref) => {
    return (
      <InputMask
        type={type}
        ref={ref}
        name={name}
        {...props}
        mask={mask}
        replacement={replacement}
        showMask
        separate
        className="border
         border-gray-300 
         text-gray-900
         sm:text-sm 
         rounded-lg 
         focus:outline-none
         focus:ring-indigo-600
         focus:border-indigo-600
         block w-full p-2.5"
      />
    );
  }
);

InputMaskTag.displayName = 'InputMaskTag';
