import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCurrLocale = () => document.documentElement.lang;

export const handleOnlyNumbersKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

  // Allow any Ctrl/Cmd combination (copy, paste, select all, etc.)
  if (e.ctrlKey || e.metaKey) return;

  // Allow navigation/editing keys
  if (allowedKeys.includes(e.key)) return;

  // Allow digits only
  if (!/^[0-9]$/.test(e.key)) {
    e.preventDefault();
  }
};
