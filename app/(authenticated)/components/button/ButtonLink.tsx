import Link from 'next/link';
import { ReactNode } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'w-max h-max inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-800 rounded-lg hover:bg-gray-300 hover:text-white hover:scale-[1.02] transition-all',
  variants: {
    color: {
      add: 'bg-cyan-700 hover:bg-cyan-800',
    },
  },
});

type Props = VariantProps<typeof button> & {
  label?: string;
  children: ReactNode;
  href: string;
};

export function ButtonLink({ label, color, children, href }: Props) {
  return (
    <Link href={href} className={button({ color })}>
      <div>{children}</div>
      {label}
    </Link>
  );
}
