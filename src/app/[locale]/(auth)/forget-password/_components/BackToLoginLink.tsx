import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function BackToLoginLink() {
  const tCommon = useTranslations('common');

  return (
    <Link
      href='/login'
      className='mx-auto mt-5 w-fit text-grayish-900 underline'
    >
      {tCommon('buttons.backToLogin')}
    </Link>
  );
}
