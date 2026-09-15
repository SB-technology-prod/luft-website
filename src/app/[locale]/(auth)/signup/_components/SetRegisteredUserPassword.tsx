'use client';
import React from 'react';

import { useTranslations } from 'next-intl';

import SetPasswordForm from '../../_components/SetPasswordForm';
import { setRegisteredUserPasswordAction } from '../../actions';

import { useRouter } from '@/i18n/routing';

export default function SetRegisteredUserPassword({
  registrationKey,
}: {
  registrationKey: string;
}) {
  const t = useTranslations('auth.signup');
  const router = useRouter();

  return (
    <SetPasswordForm
      title={t('setPassword.title')}
      description={t('setPassword.description')}
      submitBtnLabel={t('setPassword.buttonLabel')}
      onSubmit={async ({ password }) => {
        const result = await setRegisteredUserPasswordAction({ password, registrationKey });
        if (!result.success) {
          throw new Error(result.error);
        }
        return result.data;
      }}
      onSubmissionSuccess={() => {
        // Redirect to home
        router.push('/');
      }}
    />
  );
}
