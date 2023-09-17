import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const InputTag = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', name = '', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        name={name}
        {...props}
             className="border
         border-gray-300 
         text-gray-900
         sm:text-sm 
         rounded-lg 
         focus:ring-indigo-200
         focus:ring-indigo-200
         focus:border-indigo-200 
         block w-full p-2.5"
      />
    );
  }
);

InputTag.displayName = 'InputTag';
