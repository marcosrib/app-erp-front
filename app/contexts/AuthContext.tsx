import React, { createContext } from 'react';
import axios from '../services/axios';
import { setCookie } from 'nookies';

type AuthContextType = {
  isAuthenticated: boolean;
};

type Props = {
  children: React.ReactNode;
};

type signInData = {
  email: string;
  password: string;
};

export const authContext = createContext({} as AuthContextType);

export function authProvider({ children }: Props) {
  const isAuthenticated = false;

  async function signIn({ email, password }: signInData) {
    const response = await axios.post('api/auth', {
      email,
      password,
    });
  }

  return (
    <authContext.Provider value={{ isAuthenticated }}>
      {children}
    </authContext.Provider>
  );
}
