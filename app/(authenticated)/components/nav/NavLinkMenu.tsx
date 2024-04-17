import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  route: string;
  active: boolean;
};

export function NavLinkMenu({ children, route, active }: Props) {
  return (
    <div>
      <Link
        href={route}
        data-active={active}
        className="
        flex items-center
         py-2.5 px-4 text-base 
         font-normal 
        
         rounded-lg
         text-dark-500 
         dark:bg-gray-800
         rounded-lg
         h-11
         hover:bg-gray-200 
         dark:hover:bg-gray-500 
         data-[active=true]:shadow-lg 
         data-[active=true]:dark:shadow-none 
         data-[active=true]:shadow-gray-200 
         data-[active=true]:dark:shadow-gray-700 
         data-[active=true]:bg-white
         data-[active=true]:dark:bg-gray-700
         group transition-all duration-200"
      >
        {children}
      </Link>
    </div>
  );
}
