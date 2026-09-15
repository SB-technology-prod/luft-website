import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { AuthUserApiResponse } from '@/types/auth';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

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

      // Clear stale session cookies so the middleware redirects on next navigation.
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      cookieStore.delete('accessTokenExpiresAt');
      cookieStore.delete('refreshTokenExpiresAt');
      cookieStore.delete('user');
      return NextResponse.json(null, { status: res.status });
    }
    console.log('Successfully refreshed access token');

    const json = await res.json();
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

    return NextResponse.json(
      {
        accessToken: data.accessToken,
        accessTokenExpiresAt: accessExpiry.getTime(),
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}
