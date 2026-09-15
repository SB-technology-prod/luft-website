import type { KeyboardEvent } from 'react';

import { getServerSession } from './session';

export const handleDownloadDocument = async (
  filePath: string,
  fileName: string,
) => {
  try {
    // Get the file from the server by making a fetch request to the provided filePath
    const response = await fetch(filePath);

    // Convert the response into a Blob object that contains the file data
    const blob = await response.blob();

    // Create a temporary URL that points to the blob data in memory
    const url = window.URL.createObjectURL(blob);

    // Create an invisible anchor element that we'll use to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

export const isLoggedIn = async () => {
  const session = await getServerSession();
  return !!session;
};

export const preventSpaces = <T extends HTMLElement>(e: KeyboardEvent<T>) => {
  if (e.key === ' ') {
    e.preventDefault();
  }
};

export const trimStringValues = <T>(obj: T): T => {
  if (typeof obj === 'string') {
    return obj.trim() as unknown as T;
  }
  if (obj !== null && typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return obj.map(trimStringValues) as unknown as T;
    }
    const result: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = trimStringValues((obj as any)[key]);
      }
    }
    return result;
  }
  return obj;
};

export const InputTrimmer = (value: unknown) => {
  if (typeof value === 'string') {
    return value.replace(/\s{2,}/g, ' ').trimStart();
  }
  return value;
};
