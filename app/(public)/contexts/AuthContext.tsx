"use client"
import React, { createContext, useState } from 'react';
import axios from '../../services/axios';
import { setCookie } from 'nookies';
import Router from 'next/router';

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

  async function signIn({ email, password }: SignInData) {
    const response = await axios.post('/auth/login/', {
      email,
      password,
    });

    setCookie(undefined, 'erp.token', response.data.token, {
      maxAge: 60 * 60 * 1, // 1 hora
    });

    setCookie(undefined, 'erp.refreshtoken', response.data.refreshtoken, {
      maxAge: 60 * 60 * 1, // 1 hora
    });
    setUser(null);
    Router.push('/dashboard');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
