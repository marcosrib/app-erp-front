import React, { createContext } from 'react';
import axios from '../../services/axios';
import { setCookie } from 'nookies';

type Props = {
  children: React.ReactNode;
};

type signInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: signInData) => Promise<void>;
};

export const authContext = createContext({} as AuthContextType);

export function authProvider({ children }: Props) {
  const isAuthenticated = false;

  async function signIn({ email, password }: signInData) {
    const response = await axios.post('api/auth', {
      email,
      password,
    });

    setCookie(undefined, 'erp.token', response.data.token, {
      maxAge: 60 * 60 * 1, // 1 hora
    });

    setCookie(undefined, 'erp.refreshtoken', response.data.refreshtoken, {
      maxAge: 60 * 60 * 1, // 1 hora
    });
  }

  return (
    <authContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </authContext.Provider>
  );
}
