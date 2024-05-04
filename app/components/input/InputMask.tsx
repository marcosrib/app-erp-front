import { InputMask, Replacement } from '@react-input/mask';
import { InputNumberFormat } from '@react-input/number-format';

import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps =
  | (InputHTMLAttributes<HTMLInputElement> & {
      mask: string;
      typeFormat: 'date-or-phone';
      replacement: Replacement | string;
    })
  | ({
      mask?: string;
      typeFormat: 'currency';
      replacement?: Replacement | string;
    } & Omit<InputHTMLAttributes<HTMLInputElement>, 'mask' | 'typeFormat'>);

const styles = `
  border
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
  block w-full p-2.5
`;

export const InputMaskTag = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', name = '', typeFormat, ...props }, ref) => {
    return typeFormat === 'date-or-phone' ? (
      <InputMask
        type={type}
        ref={ref}
        name={name}
        {...props}
        showMask
        separate
        className={styles}
      />
    ) : (
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
          R$
        </span>
        <InputNumberFormat
          type={type}
          ref={ref}
          name={name}
          locales={['ban', 'id']}
          maximumFractionDigits={2}
          {...props}
          className={`${styles} pl-8`}
        />
      </div>
    );
  }
);

InputMaskTag.displayName = 'InputMaskTag';
