import Link from 'next/link';
import { useTranslations } from 'next-intl';

import TextBetweenLine from '../_components/TextBetweenLine';

import LoginForm from './_components/LoginForm';
import SocialLogin from './_components/SocialLogin';

export default function Page() {
  const t = useTranslations('auth.login');

  return (
    <div className='flex flex-col'>
      <LoginForm />
      <TextBetweenLine className='mb-2 mt-4'>
        {t('orLoginWith')}
      </TextBetweenLine>
      <SocialLogin />
      <p className='mt-6 flex items-center justify-center gap-2 text-sm text-grayish-400'>
        <span>{t('dontHaveAccount')}</span>
        <Link
          href='/signup'
          className='text-grayish-900 underline'
        >
          {t('signupLink')}
        </Link>
      </p>
    </div>
  );
}
