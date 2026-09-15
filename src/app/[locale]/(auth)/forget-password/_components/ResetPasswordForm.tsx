'use client';
import React from 'react';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import SetPasswordForm from '../../_components/SetPasswordForm';

import { resetPassword } from '@/api/auth';

export default function ResetPasswordForm({
  validationKey,
}: {
  validationKey: string;
}) {
  const t = useTranslations('auth.forgetPassword');
  const router = useRouter();

  return (
    <SetPasswordForm
      title={t('setPassword.title')}
      description={t('setPassword.description')}
      submitBtnLabel={t('setPassword.buttonLabel')}
      onSubmit={({ password }) =>
        resetPassword({ newPassword: password, validationKey })
      }
      onSubmissionSuccess={() => router.push('/login')}
    />
  );
}
