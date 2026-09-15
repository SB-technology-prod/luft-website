import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { getServerSession, refreshAccessToken } from '@/utils/session';

// Opt-in to the Edge Runtime for significantly faster cold starts and lower latency.
export const runtime = 'edge';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  // Fast-path: if neither token exists, user is not logged in.
  if (!accessToken && !refreshToken) {
    return NextResponse.json(null);
  }

  if (!accessToken) {
    // refreshAccessToken handles the fetch and cookie-setting automatically.
    const newSession = await refreshAccessToken();
    if (!newSession) {
      return NextResponse.json(null);
    }
    return NextResponse.json(newSession);
  }

  // If the token is valid, parse and return the session normally.
  const session = await getServerSession();

  return NextResponse.json(session);
}
