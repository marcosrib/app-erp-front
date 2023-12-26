'use client';
import { ComponentProps, ReactNode } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'px-4 py-2 text-white rounded-md bg-gray-500 hover:bg-grey-600',
  variants: {
    color: {
      search: 'bg-teal-700 hover:bg-teal-800',
      clean: 'bg-gray-500 hover:bg-gray-600',
      add: 'bg-cyan-700 hover:bg-cyan-800',
    },
  },
});

type Props = ComponentProps<'button'> &
  VariantProps<typeof button> & {
    label: string;
    icon?: ReactNode;
  };

export default function Button({ label, color, icon, ...props }: Props) {
  return (
    <button className={button({ color })} {...props}>
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </div>
    </button>
  );
}
