'use server';

import { cookies } from 'next/headers';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export async function updateUserCookieAction(userUpdate: {
  name?: string;
  profilePicture?: string;
}) {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user')?.value;

  if (userCookie) {
    try {
      const userData = JSON.parse(userCookie);
      const newUserData = { ...userData, ...userUpdate };
      cookieStore.set('user', JSON.stringify(newUserData), COOKIE_OPTIONS);
      return { success: true };
    } catch (error) {
      console.error('Failed to parse user cookie', error);
      return { success: false, error: 'Failed to parse user cookie' };
    }
  }
  return { success: false, error: 'User cookie not found' };
}
