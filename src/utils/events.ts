'use client';
import { UserSession } from '@/types/session';

export const updateSession = (session: UserSession) => {
  window.dispatchEvent(
    new CustomEvent('sessionUpdate', {
      detail: session,
    }),
  );
};
