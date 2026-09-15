import { Locale } from '@/i18n/i18n.config';

export const getLanguage = async () => {
  if (typeof window === 'undefined') {
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      return cookieStore.get('NEXT_LOCALE')?.value || 'en';
    } catch {
      return 'en';
    }
  } else {
    const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : 'en';
  }
};

export const getTextLocale = (text: string): Locale | undefined => {
  const arabicRegex = /[\u0600-\u06FF]/;
  const englishRegex = /[A-Za-z]/;

  const hasArabic = arabicRegex.test(text);
  const hasEnglish = englishRegex.test(text);

  if (hasArabic && !hasEnglish) return 'ar';
  if (hasEnglish && !hasArabic) return 'en';
};
