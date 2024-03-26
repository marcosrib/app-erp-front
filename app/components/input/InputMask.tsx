import { InputMask } from '@react-input/mask';
import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const InputMaskTag = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', name = '', ...props }, ref) => {
    return (
      <InputMask
        type={type}
        ref={ref}
        name={name}
        {...props}
        mask="__/__/____"
        replacement={{ _: /\d/ }}
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
