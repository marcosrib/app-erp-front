'use client';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

type Option = { value: string | number; label: string };

type CustomSelectProps = {
  name: string;
  control: any;
  options: Option[];
  isClearable?: boolean;
  isSearchable?: boolean;
  defaultValue: string | number;
  defaultLabel: string;
};
/*
configurar cor de fundo option
styles={{
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#6A5ACD' : '#6A5ACD', // Define a cor de fundo das opções selecionadas e não selecionadas
        color: state.isSelected ? 'white' : 'black', // Define a cor do texto das opções selecionadas e não selecionadas
      }),
    }}
*/
const CustomSelect = ({
  name,
  control,
  options,
  isClearable = false,
  isSearchable = false,
  defaultLabel,
  defaultValue,
}: CustomSelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={{ value: defaultValue, label: defaultLabel }}
      render={({ field }) => (
        <Select
          {...field}
          instanceId={1}
          options={options}
          isClearable={isClearable}
          isSearchable={isSearchable}
        />
      )}
    />
  );
};

export default CustomSelect;
