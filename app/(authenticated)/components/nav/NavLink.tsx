import Link from "next/link";
import { ReactNode } from "react";


type Props = {
  children: ReactNode,
  route: string,
  active: boolean
}


export function NavLink({ children, route, active }: Props) {
  return (
    <>
      <Link
        href={route}
        data-active={active}
        className='flex 
        items-center 
        justify-start 
        w-full p-2 
        font-bold 
        rounded-lg
        mt-2
        pl-6 
        text-gray-500
        transition-colors duration-200
        border-transparent 
        hover:bg-gray-200
        dark:hover:bg-gray-600
        data-[active=true]:dark:bg-gray-700
        data-[active=true]:bg-gray-200'
      >
        {children}
      </Link>
    </>
  )
} 