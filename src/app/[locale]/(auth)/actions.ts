'use server';

import { cookies } from 'next/headers';

import { LoginFormData, SetRegisteredUserPasswordFormData } from '@/types/auth';

import { apiFetch } from '@/utils/api';
import { getServerSession, signOut as clearSession } from '@/utils/session';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

type ActionResult<T = any> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function loginAction(
  credentials: LoginFormData,
): Promise<ActionResult> {
  try {
    const response = await apiFetch('api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        emailOrPhone: credentials.email,
        password: credentials.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const userData = {
      id: response.result.userId,
      email: response.result.email,
      phoneNumber: response.result.phone,
      name: response.result.fullName,
      profilePicture: response.result.profilePicture,
    };

    const accessTokenExpiresAt = new Date(response.result.accessTokenExpiresAt);

    const refreshTokenExpiresAt = new Date(
      response.result.refreshTokenExpiresAt,
    );
    // Set session cookies
    const cookieStore = await cookies();

    cookieStore.set('accessToken', response.result.accessToken, {
      ...COOKIE_OPTIONS,
      expires: accessTokenExpiresAt,
    });

    cookieStore.set('refreshToken', response.result.refreshToken, {
      ...COOKIE_OPTIONS,
      expires: refreshTokenExpiresAt,
    });

    cookieStore.set(
      'refreshTokenExpiresAt',
      response.result.refreshTokenExpiresAt,
      COOKIE_OPTIONS,
    );

    cookieStore.set(
      'accessTokenExpiresAt',
      response.result.accessTokenExpiresAt,
      COOKIE_OPTIONS,
    );

    cookieStore.set('user', JSON.stringify(userData), COOKIE_OPTIONS);

    // Return the same format as the original function
    return { success: true, data: response };
  } catch (error) {
    // Return error instead of throwing to avoid Next.js sanitization in production
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

export async function setRegisteredUserPasswordAction(
  passwordData: SetRegisteredUserPasswordFormData,
): Promise<ActionResult> {
  try {
    const response = await apiFetch('api/auth/register/complete-register', {
      method: 'POST',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response;

    const accessTokenExpiresAt = new Date(
      decodeURIComponent(data.result.accessTokenExpiresAt),
    );

    const refreshTokenExpiresAt = new Date(
      decodeURIComponent(data.result.refreshTokenExpiresAt),
    );
    // Set session cookies
    const cookieStore = await cookies();

    cookieStore.set('accessToken', data.result.accessToken, {
      ...COOKIE_OPTIONS,
      expires: accessTokenExpiresAt,
    });

    cookieStore.set('refreshToken', data.result.refreshToken, {
      ...COOKIE_OPTIONS,
      expires: refreshTokenExpiresAt,
    });

    cookieStore.set(
      'refreshTokenExpiresAt',
      data.result.refreshTokenExpiresAt,
      COOKIE_OPTIONS,
    );

    cookieStore.set(
      'accessTokenExpiresAt',
      data.result.accessTokenExpiresAt,
      COOKIE_OPTIONS,
    );

    const userData = {
      id: response.result.userId,
      email: response.result.email,
      phoneNumber: response.result.phone,
      name: response.result.fullName,
      profilePicture: response.result.profilePicture,
    };

    cookieStore.set('user', JSON.stringify(userData), COOKIE_OPTIONS);

    // Return the same format as the original function
    return { success: true, data: response };
  } catch (error) {
    // Return error instead of throwing to avoid Next.js sanitization in production
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

export const signOut = async () => {
  const session = await getServerSession();
  const token = session?.accessToken;

  if (token) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Failed to call logout API:', error);
    }
  }

  await clearSession();
};
