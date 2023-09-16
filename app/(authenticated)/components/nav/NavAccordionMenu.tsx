'use client'

import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode,
  label: string,
  active: boolean
  isAccordian?: boolean
}
export function NavAccordionMenu ({children, label, active, isAccordian = false}: Props) {
   
    const [expanded, setExpanded] = useState(active);    
   console.log(expanded);
   
    const toggleMenu = () => {
       setExpanded(!expanded);
     };
     
    return (
       <div>
         <div
           data-expanded={expanded}
           onClick={toggleMenu}
           className='w-full flex items-center py-2.5 
           px-4 text-base 
           font-normal 
           text-dark-500 
           rounded-lg 
           hover:bg-gray-200  
           bg-white
           data-[expanded=true]:bg-black
           shadow-lg 
           shadow-gray-200 hover:!bg-white 
          group transition-all duration-200'
         >
           <p>{label}</p>
         </div>
         <div className={`pl-4 ${expanded && !isAccordian ? "block" : "hidden"}`}>
           {children}
         </div>
       </div>
     );
}