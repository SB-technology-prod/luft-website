'use client';

import { useLocale } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === 'en' ? 'ar' : 'en';

  const switchLanguage = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      type='button'
      className='w-fit text-grayish-900 underline'
      onClick={switchLanguage}
    >
      {nextLocale === 'en' ? 'En' : 'عربي'}
    </button>
  );
}
