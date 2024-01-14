import './globals.css';
import 'react-toastify/dist/ReactToastify.css'

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextAuthSessionProvider from './providers/sessionProvider';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ERP',
  description: 'Sistema gerenciamento',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
        <html lang="en">
          <body className={inter.className}>
          <ToastContainer />
            <NextAuthSessionProvider>
            {children}
            </NextAuthSessionProvider>
            </body>
        </html>
    </>
  );
}
