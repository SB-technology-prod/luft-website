import { getLanguage } from './language';

import { AuthUserApiResponse } from '@/types/auth';
import { UserSession } from '@/types/session';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

/** Dynamically imports cookies() so this module is safe in client SSR bundles. */
const getCookies = async () => {
  const { cookies } = await import('next/headers');
  return cookies();
};

export const getServerSession = async (): Promise<UserSession | null> => {
  const cookieStore = await getCookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken && !refreshToken) return null;
  const accessTokenExpiresAt =
    cookieStore.get('accessTokenExpiresAt')?.value ?? '';
  const refreshTokenExpiresAt =
    cookieStore.get('refreshTokenExpiresAt')?.value ?? '';

  const userData = JSON.parse(cookieStore.get('user')?.value ?? '{}');

  return {
    accessToken: accessToken ?? '',
    accessTokenExpiresAt: accessTokenExpiresAt
      ? new Date(accessTokenExpiresAt).getTime()
      : Date.now(),
    refreshToken: refreshToken ?? '',
    refreshTokenExpiresAt: refreshTokenExpiresAt
      ? new Date(refreshTokenExpiresAt).getTime()
      : Date.now(),
    user: userData,
  };
};

/**
 * Calls the backend refresh-token endpoint, persists the new tokens in cookies,
 * and returns the updated UserSession.
 * Returns null (and clears the session) if the refresh fails.
 *
 * Use this from Server Components / Server Actions only.
 * Middleware has its own Edge-safe refresh logic.
 */
export const refreshAccessToken = async (): Promise<UserSession | null> => {
  const cookieStore = await getCookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) return null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      },
    );

    if (!res.ok) {
      console.log('Failed to refresh access token');

      await signOut();
      return null;
    }

    console.log('Successfully refreshed access token');

    const json = await res.json();
    // Support both wrapped { result: ... } and unwrapped response shapes.
    const data: AuthUserApiResponse = json.result ?? json;

    const accessExpiry = new Date(data.accessTokenExpiresAt);
    const refreshExpiry = new Date(data.refreshTokenExpiresAt);

    const userData = {
      id: data.userId,
      email: data.email,
      phone: data.phone,
      name: data.fullName,
      profilePicture: data.profilePicture,
    };

    cookieStore.set('accessToken', data.accessToken, {
      ...COOKIE_OPTIONS,
      expires: accessExpiry,
    });
    cookieStore.set('refreshToken', data.refreshToken, {
      ...COOKIE_OPTIONS,
      expires: refreshExpiry,
    });
    cookieStore.set(
      'accessTokenExpiresAt',
      data.accessTokenExpiresAt,
      COOKIE_OPTIONS,
    );
    cookieStore.set(
      'refreshTokenExpiresAt',
      data.refreshTokenExpiresAt,
      COOKIE_OPTIONS,
    );
    cookieStore.set('user', JSON.stringify(userData), COOKIE_OPTIONS);

    return {
      accessToken: data.accessToken,
      accessTokenExpiresAt: accessExpiry.getTime(),
      refreshToken: data.refreshToken,
      refreshTokenExpiresAt: refreshExpiry.getTime(),
      user: userData,
    };
  } catch {
    return null;
  }
};

export const setUserSession = async (session: UserSession) => {
  const cookieStore = await getCookies();
  cookieStore.set('accessToken', session.accessToken);
  cookieStore.set('refreshToken', session.refreshToken);
  cookieStore.set(
    'accessTokenExpiresAt',
    session.accessTokenExpiresAt.toString(),
  );
  cookieStore.set(
    'refreshTokenExpiresAt',
    session.refreshTokenExpiresAt.toString(),
  );
};

export const signOut = async () => {
  if (typeof window === 'undefined') {
    // Server-side: clear cookies directly, then redirect
    const cookieStore = await getCookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('accessTokenExpiresAt');
    cookieStore.delete('refreshTokenExpiresAt');
    cookieStore.delete('user');

    const { redirect } = await import('@/i18n/routing');
    redirect({ href: '/login', locale: await getLanguage() });
  } else {
    // Client-side: call the API route to clear HttpOnly cookies, then navigate
    await fetch('/api/auth/logout', { method: 'POST', cache: 'no-store' });
    window.location.href = '/login';
  }
};
