import { notFound } from 'next/navigation';

import { concatErrors } from './errors';
import { updateSession } from './events';
import { trimStringValues } from './index';
import { getLanguage } from './language';
import { signOut } from './session';

import { UserSession } from '@/types/session';

let clientSessionCache: UserSession | null = null;
let sessionFetchPromise: Promise<UserSession | null> | null = null;

export const getSession = async (): Promise<UserSession | null> => {
  if (typeof window === 'undefined') {
    // Server-side: read cookies directly without hitting an endpoint
    const { getServerSession } = await import('./session');
    return await getServerSession();
  }

  // Client-side: check if we have a valid cached session
  if (clientSessionCache) {
    if (
      Date.now() < new Date(clientSessionCache.accessTokenExpiresAt).getTime()
    ) {
      return clientSessionCache;
    }
    clientSessionCache = null; // Clear expired cache
  }

  // Deduplicate concurrent fetch requests
  if (sessionFetchPromise) {
    return sessionFetchPromise;
  }

  sessionFetchPromise = fetch('/api/auth/session')
    .then((res) => res.json())
    .then((session) => {
      clientSessionCache = session;
      sessionFetchPromise = null;

      if (typeof window !== 'undefined') {
        updateSession(session);
      }

      return session;
    })
    .catch((err) => {
      sessionFetchPromise = null;
      throw err;
    });

  return sessionFetchPromise;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function updateSearchParams(key: string, value: string) {
  const searchParams = new URLSearchParams(location.search);

  searchParams.set(key, value);

  const newPathname = `${location.pathname}?${searchParams.toString()}`;

  return newPathname;
}

export function deleteSearchParams(paramName: string, paramValue: string) {
  const searchParams = new URLSearchParams(window.location.search);

  const values = searchParams.getAll(paramName);

  const updatedValues = values.filter((value) => value !== paramValue);

  if (updatedValues.length > 0) {
    searchParams.set(paramName, updatedValues.join(','));
  } else {
    searchParams.delete(paramName);
  }

  return `?${searchParams.toString()}`;
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  isAuth: boolean = true,
) {
  const language = await getLanguage();

  let accessToken;

  if (isAuth) {
    const session = await getSession();
    accessToken = session?.accessToken || '';
  }

  if (options.body instanceof FormData) {
    const newFormData = new FormData();
    for (const [key, value] of options.body.entries()) {
      if (typeof value === 'string') {
        newFormData.append(key, value.trim());
      } else {
        newFormData.append(key, value);
      }
    }
    options.body = newFormData;
  } else if (typeof options.body === 'string') {
    try {
      const parsedBody = JSON.parse(options.body);
      options.body = JSON.stringify(trimStringValues(parsedBody));
    } catch (e) {
      // Ignore if it's not a valid JSON string
    }
  }

  const res = await fetch(`${apiUrl}/${endpoint}`, {
    ...options,
    headers: {
      language,
      ...(options.headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    if (res.status === 401) {
      await signOut();
      throw new Error('401 Unauthorized', {
        cause: res.status,
      });
    }

    const data = await res.json();
    if (data.errors) {
      throw new Error(concatErrors(data), {
        cause: data.statusCode,
      });
    }
    throw new Error(data.message, {
      cause: data.statusCode,
    });
  }

  const data = await res.json();
  if (data?.isError) {
    if (data.statusCode === 401) {
      await signOut();
    }

    if (data.statusCode === 404) {
      notFound();
    }
    throw new Error(data?.message, {
      cause: data.statusCode,
    });
  }

  return data;
}

export async function getAllDataParallel(
  endpoints: string[],
  options: RequestInit = {},
) {
  const res = await Promise.all(
    endpoints.map((endpoint) => apiFetch(endpoint, options)),
  );

  return res;
}
