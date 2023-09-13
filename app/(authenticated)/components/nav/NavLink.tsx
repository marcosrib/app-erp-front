import Link from "next/link";
import { ReactNode } from "react";


type Props = {
  children: ReactNode,
  route: string,
  active: boolean
}


export function NavLink({children, route, active }:Props) {
  return (
    <>
      <Link
        href={route}
        data-active={active}
        className='flex 
        items-center 
        justify-start 
        w-full p-2 
        pl-6 my-2 
        text-gray-400
        transition-colors duration-200
        border-l-4 border-transparent 
        hover:text-gray-800
        data-[active=true]:text-gray-800
        data-[active=true]:border-purple-500
        data-[active=true]:dark:text-white'
      >
        {children}
      </Link>
    </>
  )  
} 