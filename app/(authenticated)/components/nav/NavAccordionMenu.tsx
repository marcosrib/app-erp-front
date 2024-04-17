'use client';

import { ReactNode, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
  label: string;
  active: boolean;
  icon: ReactNode;
};
export function NavAccordionMenu({ children, label, active, icon }: Props) {
  const [expanded, setExpanded] = useState(active);
  const toggleMenu = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  useEffect(() => {
    if (!active) {
      setExpanded(active);
    }
  }, [active]);

  return (
    <>
      <button
        data-active={active}
        onClick={toggleMenu}
        className="w-full flex items-center py-2.5 
           px-4 text-base 
           font-normal 
           rounded-lg
           text-dark-500 
           dark:text-white 
           data-[active=true]:bg-white
           data-[active=true]:dark:bg-gray-700
           data-[active=true]:shadow-lg 
           data-[active=true]:dark:shadow-none 
           data-[active=true]:shadow-gray-200 
           dark:hover:bg-gray-500
           hover:bg-gray-200 group  transition-all duration-200"
      >
        <span className="pr-2">{icon}</span>
        <p>{label}</p>
      </button>
      <div className={` ${expanded ? 'block' : 'hidden'}`}>{children}</div>
    </>
  );
}
