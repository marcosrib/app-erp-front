import clsx from 'clsx';

type Props = {
  label: string;
  searchParams: { label: string };
  initialPage?: boolean;
};

export function TabHeaderContent({
  label,
  searchParams,
  initialPage = false,
}: Props) {
  const initPage = initialPage && searchParams.label == null;
  return (
    <div
      className={clsx(
        'py-4',
        'px-6',
        'mr-2',
        'cursor-pointer',
        'rounded-t-lg',
        'border-t-2',
        'border-r-2',
        'border-l-2',
        'font-semibold',
        'border-transparent',
        searchParams.label === label || initPage
          ? 'bg-cyan-700 text-white dark:bg-gray-700 '
          : 'bg-gray-200 text-gray-800 dark:text-white dark:bg-gray-500'
      )}
    >
      {label}
    </div>
  );
}
