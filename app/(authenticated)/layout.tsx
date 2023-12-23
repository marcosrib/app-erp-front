import AppProviders from './providers'

import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';

import { redirect } from 'next/navigation';


export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {

 const session = await getServerSession(nextAuthOptions);

 if(!session) {
    redirect('/login');
 }

  return (
    <>
        <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <Sidebar />
            <div className="flex flex-col w-full md:space-y-4">
              <Header />
              <div className="h-screen pb-24 overflow-auto pr-5">
                <AppProviders>
                {children}
                </AppProviders>
              </div>
            </div>
          </div>
        </main>
      </> 
  );
}
