'use client';

import { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import SessionProvider from '@/contexts/SessionContext';

import { UserSession } from '@/types/session';

export default function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: UserSession;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <SessionProvider value={session}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
