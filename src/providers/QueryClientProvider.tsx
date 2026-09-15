'use client';
import React, { ReactNode } from 'react';

import {
  QueryClient,
  QueryClientProvider as Provider,
} from '@tanstack/react-query';

export default function QueryClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();

  return <Provider client={queryClient}>{children}</Provider>;
}
