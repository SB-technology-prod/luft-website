'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export default function LoginNavBtn() {
  const t = useTranslations('common');
  const locale = useLocale();
  return (
    <Link
      href={'/login'}
      className={cn(
        'flex h-10 w-[5.5rem] !min-w-fit items-center justify-center rounded-full bg-grayish-900 px-3 text-grayish-50',
        {
          'w-fit': locale === 'ar',
        },
      )}
    >
      {t('buttons.login')}
    </Link>
  );
}
