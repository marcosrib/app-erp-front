import { tv, VariantProps } from 'tailwind-variants';

const badge = tv({
  base: 'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10',
  variants: {
    bgColor: {
      success: 'bg-green-50 text-green-700 ring-green-600/20',
      error: 'bg-red-50 text-red-700 ring-red-600/20',
      warn: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    },
  },
});

type Props = VariantProps<typeof badge> & {
  title: string;
};

export default function Badge({ title, bgColor }: Props) {
  return <span className={badge({ bgColor })}>{title}</span>;
}
