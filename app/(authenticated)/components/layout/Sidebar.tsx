"use client"
import { BiSolidDashboard } from 'react-icons/bi'
import { MdLibraryBooks } from  'react-icons/md'
import { usePathname } from 'next/navigation'
import { Nav } from "../nav";



export default function Sidbar() {
  
  const path = usePathname();
  
  return (
    <div className="relative hidden h-screen shadow-lg lg:block w-80">
      <div className="h-full bg-white dark:bg-gray-700">
        <div className="flex items-center justify-start pt-6 ml-8">
          <p className="text-xl font-bold dark:text-white">ERP</p>
        </div>
        <Nav.Root>
          <Nav.Link 
            route='/dashboard'
            active={path ==='/dashboard'}
            >
            <Nav.Icon icon={<BiSolidDashboard size={20}/>}/>
            <Nav.IconLabel label='Dashboard'/>
          </Nav.Link>
          <Nav.Link 
            route='/registre'
            active={path ==='/registre'}
            >
            <Nav.Icon icon={<MdLibraryBooks size={20}/>}/>
            <Nav.IconLabel label='Cadastro'/>
          </Nav.Link>
        </Nav.Root>
      </div>
    </div>
  );
}
