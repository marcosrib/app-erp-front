import { forwardRef } from "react";

type CheckBoxProps = {
  label: string;
  name: string;
  value: boolean;
  onChange: (checked: boolean) => void;
  
};

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, name, value, onChange }, ref) => {
    return (
      <div className="flex">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            name={name}
            aria-describedby="helper-checkbox-text"
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="ml-2 text-sm">
          <label className="font-medium text-gray-700 dark:text-gray-300">{label}</label>
        </div>
      </div>
    );
  }
);

CheckBox.displayName = 'CheckBox';
