import { TextareaHTMLAttributes, forwardRef } from 'react';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  name?: string;
  errors?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ name = '', label, errors, ...props }, ref) => {
    return (
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          {label}
        </label>
        <textarea
          ref={ref}
          name={name}
          {...props}
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
        { 
         errors && 
         (<span className="block text-red-500 text-sm font-medium mb-2 mt-2">
           {errors}
          </span> 
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
