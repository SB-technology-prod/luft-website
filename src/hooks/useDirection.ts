'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

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
