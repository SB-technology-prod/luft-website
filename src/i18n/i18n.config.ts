export const i18n = {
  // A list of all locales that are supported
  locales: ['en', 'ar'],

  // Used when no locale matches
  defaultLocale: 'en',
} as const;

export type Locale = (typeof i18n)['locales'][number];
export type Dir = 'rtl' | 'ltr';
