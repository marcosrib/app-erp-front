'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
}

export function QueryClientProviderWrapper({ children }: Props) {
    const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}