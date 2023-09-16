import Link from "next/link";
import { ReactNode } from "react";


type Props = {
  children: ReactNode,
  route: string,
  active: boolean
}


export function NavLinkMenu({children, route, active }:Props) {
  return (
    <>
      <Link
        href={route}
        data-active={active}
        className='
        w-full flex items-center py-2.5 px-4 
        text-base font-normal text-dark-500
        rounded-lg hover:bg-gray-200  
        bg-white shadow-lg shadow-gray-200 
        hover:!bg-white  group transition-all duration-200
        data-[active=true]:text-gray-800'
      >
        {children}
      </Link>
    </>
  )  
} 