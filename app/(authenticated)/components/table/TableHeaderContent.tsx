type Props = {
  title: string;
};

export function TableHeaderContent({ title }: Props) {
  return (
    <th
      scope="col"
      className="p-4 text-xs font-medium text-left dark:text-gray-400 text-gray-500 uppercase lg:p-5"
    >
      {title}
    </th>
  );
}
