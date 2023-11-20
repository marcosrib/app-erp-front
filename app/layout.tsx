import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';


import { AuthProvider } from './(public)/contexts/AuthContext';
import NextAuthSessionProvider from './providers/sessionProvider';
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
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <NextAuthSessionProvider>
           {children}
          </NextAuthSessionProvider>
          </body>
      </html>
    </AuthProvider>
  );
}
