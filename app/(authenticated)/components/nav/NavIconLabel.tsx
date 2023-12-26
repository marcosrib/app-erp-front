type Props = {
  label: string;
};

export function NavIconLabel({ label }: Props) {
  return (
    <>
      <span className="mx-2 text-sm font-normal">{label}</span>
    </>
  );
}
