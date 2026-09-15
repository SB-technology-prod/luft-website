import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  cookieStore.delete('accessTokenExpiresAt');
  cookieStore.delete('refreshTokenExpiresAt');
  cookieStore.delete('user');

  return NextResponse.json({ success: true, message: 'logout successfully' });
}
