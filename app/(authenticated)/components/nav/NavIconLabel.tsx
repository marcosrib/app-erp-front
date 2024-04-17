type Props = {
  label: string;
};

export function NavIconLabel({ label }: Props) {
  return (
    <>
      <span className="mx-2 text-sm dark:text-white font-normal">{label}</span>
    </>
  );
}
