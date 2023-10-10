import '../globals.css';
import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import AppProviders from './providers'
import 'react-toastify/dist/ReactToastify.css'

import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ERP',
  description: 'Sistema de gerênciamento',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
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
      </body>
    </html>  
  );
}
