'use client';

import { createContext, useEffect, useState } from 'react';

import { UserSession } from '@/types/session';

export const SessionContext = createContext<UserSession | null>(null);

export function SessionProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: UserSession | null;
}) {
  const [session, setSession] = useState<UserSession | null>(value);

  useEffect(() => {
    setSession(value);
  }, [value]);

  useEffect(() => {
    const handleSessionUpdate = (event: CustomEvent<UserSession | null>) => {
      setSession(event.detail);
    };

    window.addEventListener(
      'sessionUpdate',
      handleSessionUpdate as EventListener,
    );
    return () => {
      window.removeEventListener(
        'sessionUpdate',
        handleSessionUpdate as EventListener,
      );
    };
  }, []);

  const isAccessTokenExpired =
    session && Date.now() >= new Date(session.accessTokenExpiresAt).getTime();

  return (
    <SessionContext.Provider
      value={
        session
          ? {
              ...session,
              accessToken: isAccessTokenExpired ? '' : session.accessToken,
            }
          : null
      }
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
