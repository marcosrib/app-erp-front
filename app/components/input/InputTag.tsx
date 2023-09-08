import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const InputTag = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', name = '', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        {...props}
        className="w-full py-2 px-3 border border-gray-300 rounded shadow focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
      />
    );
  }
);

InputTag.displayName = 'InputTag';
