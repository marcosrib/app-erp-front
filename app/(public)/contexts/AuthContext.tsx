"use client"
import React, { createContext, useState } from 'react';
import apiInstance from '../../services/api';
import { setCookie } from 'nookies';
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { createLocalToken } from '@/app/services/cookies/localTokenService';

type Props = {
  children: React.ReactNode;
};

type SignInData = {
  email: string;
  password: string;
};

type User = {
  name: string,
  id: Number
}

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  user: User | null;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = false;

  const router = useRouter()

  async function signIn({ email, password }: SignInData) {
    /* const api = apiInstance();
    const response = await api.post('/auth/login/', {
      email,
      password,
    });*/


    api.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`
    
    const claimData = JSON.parse(atob(response.data.accessToken .split('.')[1]));
    setUser(claimData);
   // createLocalToken({ token: response.data.accessToken, refreshToken: response.data.refreshToken})
    router.push('/dashboard');
    
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
