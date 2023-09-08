import Link from "next/link";
import { ReactNode } from "react";
type Props = {
    children: ReactNode,
    route: string,
    isActive: boolean
}

export function NavLink({children, route, isActive }:Props) {
  return (
    <>
      <Link
        href={route}
        className={`flex items-center 
        justify-start
        w-full 
        p-2 
        pl-6 
        my-2
        ${isActive ?  
          'text-gray-800 transition-colors duration-200 border-l-4 border-purple-500 dark:text-white' :
          'text-gray-400 transition-colors duration-200 border-l-4 border-transparent hover:text-gray-800'
        } `}
      >
        {children}
      </Link>
    </>
     

  
  )  
} 