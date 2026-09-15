'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useMutation } from '@tanstack/react-query';

import CustomInputWithIcon from '@/components/shared/form/CustomInputWithIcon';
import { Form } from '@/components/ui/form';

import AuthFormLayout from '../../_components/AuthFormLayout';

import EnvelopeIcon from './icons/EnvlopeIcon';

import {
  ForgetPasswordFormData,
  SendOTPForgetPasswordResponse,
} from '@/types/auth';

import { sendOtpForgetPassword } from '@/api/auth';
import { zodResolver } from '@hookform/resolvers/zod';

type CreateAccountFormProps = {
  setIsOtpSent: Dispatch<SetStateAction<boolean>>;
  setUserEmail: Dispatch<SetStateAction<string | undefined>>;
};

export default function ForgetPasswordForm({
  setIsOtpSent,
  setUserEmail,
}: CreateAccountFormProps) {
  const [serverError, setServerError] = useState<string | undefined>();

  const t = useTranslations('auth.forgetPassword');
  const tCommon = useTranslations('common');

  const formSchema = z.object({
    email: z
      .string({ required_error: tCommon('validations.email.required') })
      .min(1, { message: tCommon('validations.email.required') })
      .email({ message: tCommon('validations.email.invalid') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutateAsync } = useMutation<
    SendOTPForgetPasswordResponse,
    Error,
    ForgetPasswordFormData
  >({
    mutationFn: (values) => sendOtpForgetPassword(values.email),
    onMutate: () => {
      setServerError(undefined);
    },
  });

  const onFormSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values, {
      onSuccess: () => {
        setIsOtpSent(true);
        setUserEmail(values.email);
      },
      onError: (error) => setServerError(error.message),
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onFormSubmit}>
        <AuthFormLayout
          title={t('title')}
          description={t('description')}
          submitBtnLabel={t('buttonLabel')}
          serverError={serverError}
        >
          <CustomInputWithIcon
            required
            fieldName='email'
            label={tCommon('labels.email')}
            type='email'
            placeholder={tCommon('placeholders.email')}
            icon={<EnvelopeIcon className='size-5' />}
          />
        </AuthFormLayout>
      </form>
    </Form>
  );
}
