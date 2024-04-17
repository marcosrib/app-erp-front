interface Props {
  label: string;
}

export function InputLabel({ label }: Props) {
  return (
    <>
      <label className="block text-gray-700  dark:text-gray-400 text-sm font-medium mb-2">
        {label}
      </label>
    </>
  );
}
