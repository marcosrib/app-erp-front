import { BiSolidDashboard } from 'react-icons/bi';
import { MdLibraryBooks } from 'react-icons/md';
import { headers } from "next/headers";
import { Nav } from '../nav';


export default function Sidbar() {
  const _headers = headers();
  const currentUrl = _headers.get('next-url') || "";

  return (
    <div className="relative hidden h-screen lg:block w-80">
      <div className="h-full bg-gray-100 px-5 dark:bg-gray-700">
        <div className="flex items-center justify-start pt-6 ml-8">
          <p className="text-xl font-bold dark:text-white">ERP</p>
        </div>
        <Nav.Root>
          <Nav.LinkMenu route="/dashboard" active={currentUrl === '/dashboard'}>
            <Nav.Icon icon={<BiSolidDashboard size={20} />} />
            <Nav.IconLabel label="Dashboard" />
          </Nav.LinkMenu>
          <Nav.AccordionMenu
            label="Cadastro"
            active={currentUrl.includes('/register')}
            icon={<MdLibraryBooks size={20} />}
          >
            <Nav.Link route="/register/user" active={currentUrl === '/register/user'}>
              <Nav.IconLabel label="Usuario" />
            </Nav.Link>
            <Nav.Link
              route="/register/permission"
              active={currentUrl.includes('/register/permission')}
            >
              <Nav.IconLabel label="Pefil" />
            </Nav.Link>
          </Nav.AccordionMenu>
        </Nav.Root>
      </div>
    </div>
  );
}
