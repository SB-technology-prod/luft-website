import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function AlreadyHasAccountMsg() {
  const t = useTranslations('auth.signup');

  return (
    <p className='mt-4 flex items-center justify-center gap-2 text-sm text-grayish-400'>
      <span>{t('alreadyHaveAccount')}</span>
      <Link
        href='/login'
        className='text-grayish-900 underline'
      >
        {t('loginLink')}
      </Link>
    </p>
  );
}
