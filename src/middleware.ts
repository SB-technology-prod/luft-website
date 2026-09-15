import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

import { AuthUserApiResponse } from '@/types/auth';

const AUTH_ROUTES = ['login', 'signup', 'forget-password'];
const PROTECTED_ROUTES = ['account/settings'];

// Using Regex avoids recreating arrays and string manipulation (split/slice/join) on every request.
// Matches optional locale /en/ or /ar/ prefix.
const AUTH_ROUTES_REGEX = new RegExp(
  `^/(?:(?:en|ar)/)?(${AUTH_ROUTES.join('|')})(?:/|$)`
);
const PROTECTED_ROUTES_REGEX = new RegExp(
  `^/(?:(?:en|ar)/)?(${PROTECTED_ROUTES.join('|')})(?:/|$)`
);

/** Deletes all auth cookies from a response (used on forced sign-out). */
function clearSessionCookies(response: NextResponse) {
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  response.cookies.delete('accessTokenExpiresAt');
  response.cookies.delete('refreshTokenExpiresAt');
  response.cookies.delete('user');
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

function applyRefreshedCookies(response: NextResponse, data: AuthUserApiResponse) {
  const accessExpiry = new Date(data.accessTokenExpiresAt);
  const refreshExpiry = new Date(data.refreshTokenExpiresAt);

  response.cookies.set('accessToken', data.accessToken, {
    ...COOKIE_OPTIONS,
    expires: accessExpiry,
  });
  response.cookies.set('refreshToken', data.refreshToken, {
    ...COOKIE_OPTIONS,
    expires: refreshExpiry,
  });
  response.cookies.set(
    'accessTokenExpiresAt',
    data.accessTokenExpiresAt,
    COOKIE_OPTIONS,
  );
  response.cookies.set(
    'refreshTokenExpiresAt',
    data.refreshTokenExpiresAt,
    COOKIE_OPTIONS,
  );
}

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAuthRoute = AUTH_ROUTES_REGEX.test(pathname);
  const isProtectedRoute = PROTECTED_ROUTES_REGEX.test(pathname);

  // Extract locale from the path if present, otherwise default to 'en'.
  // This avoids a bug where root paths like '/login' would incorrectly use 'login' as the locale.
  const localeMatch = pathname.match(/^\/(en|ar)(?:\/|$)/);
  const locale = localeMatch ? localeMatch[1] : 'en';

  // Read auth state directly from request cookies (Edge Runtime safe).
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const accessTokenExpiresAt = request.cookies.get('accessTokenExpiresAt')?.value;

  let accessExpired = !accessToken;
  if (accessToken && accessTokenExpiresAt) {
    if (Date.now() >= new Date(accessTokenExpiresAt).getTime()) {
      accessExpired = true;
    }
  }

  const refreshExpired = !refreshToken;

  // A user is authenticated if they have a non-expired refresh token
  // (or a successful refresh just happened).
  let isAuth = !!(accessToken || refreshToken);

  let refreshedTokens: AuthUserApiResponse | null = null;

  // Attempt to refresh if: access token is expired but refresh token is still valid.
  if (accessExpired && !refreshExpired && refreshToken) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        },
      );

      if (response.ok) {
        console.log('Successfully refreshed access token');
        const json = await response.json();
        refreshedTokens = json.result ?? json;
        isAuth = true;

        // Update the request cookies so the following middleware or handlers see the new tokens
        request.cookies.set('accessToken', refreshedTokens!.accessToken);
        request.cookies.set('refreshToken', refreshedTokens!.refreshToken);
      } else {
        console.log('Failed to refresh access token');
        isAuth = false;
      }
    } catch (error) {
      console.error('Error refreshing token in middleware:', error);
      isAuth = false;
    }
  }

  // Authenticated user visiting an auth page → redirect to home.
  if (isAuth && isAuthRoute) {
    const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
    if (refreshedTokens) {
      applyRefreshedCookies(response, refreshedTokens);
    }
    return response;
  }

  // Unauthenticated user visiting a protected page → redirect to login.
  if (!isAuth && isProtectedRoute) {
    const response = NextResponse.redirect(
      new URL(`/${locale}/login`, request.url),
    );
    clearSessionCookies(response);
    return response;
  }

  // Normal navigation — let next-intl handle it, attach fresh cookies if refreshed.
  const response = createMiddleware(routing)(request);

  if (refreshedTokens) {
    applyRefreshedCookies(response, refreshedTokens);
  } else if (!isAuth && refreshToken) {
    // If the token refresh failed entirely, ensure we clear the dead session cookies
    // even if they were visiting a public un-protected route.
    clearSessionCookies(response);
  }

  return response;
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and static assets
  matcher: [
    '/',
    '/(en|ar)/:path*',
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|webmanifest)$).*)',
  ],
};
