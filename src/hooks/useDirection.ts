'use client';

import { useEffect } from 'react';

import { useLocale } from 'next-intl';

export type Direction = 'ltr' | 'rtl';

export function getLanguageDirection(language: string): Direction {
  return language === 'ar' ? 'rtl' : 'ltr';
}

export function useDirection() {
  const language = useLocale();
  const direction = getLanguageDirection(language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  return direction;
}
