'use client'
import {  Controller } from "react-hook-form";
import Select from 'react-select';

type Option = { value: number; label: string }; 

type CustomSelectProps = {
  name: string;
  control: any;
  options: Option[];
};

const CustomSelect = ({ name, control, options }: CustomSelectProps) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            instanceId={1}
            options={options}
            isSearchable={false}
          />
        )}
      />
    );
  };
  
  export default CustomSelect;