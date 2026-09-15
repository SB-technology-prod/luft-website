'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useMutation } from '@tanstack/react-query';

import CustomInput from '@/components/shared/form/CustomInput';
import { Form } from '@/components/ui/form';

import AuthFormLayout from '../../_components/AuthFormLayout';

import {
  SendOtpPreregisterResponse,
  SignupFormData,
  UserSignupData,
} from '@/types/auth';

import { preventSpaces } from '@/utils';

import { NAME_REGEX } from '@/constants/regex';

import { sendOtpPreregister } from '@/api/auth';
import { zodResolver } from '@hookform/resolvers/zod';

type CreateAccountFormProps = {
  setIsOtpSent: Dispatch<SetStateAction<boolean>>;
  setUserData: Dispatch<SetStateAction<UserSignupData>>;
};

export default function CreateAccountForm({
  setIsOtpSent,
  setUserData,
}: CreateAccountFormProps) {
  const [serverError, setServerError] = useState<string | undefined>();
  const tCommon = useTranslations('common');
  const t = useTranslations('auth.signup');

  const formSchema = z.object({
    firstName: z
      .string({ required_error: tCommon('validations.firstName.required') })
      .min(1, { message: tCommon('validations.firstName.required') })
      .min(2, tCommon('validations.firstName.min', { min: 2 }))
      .max(50, tCommon('validations.firstName.max', { max: 50 }))
      .regex(NAME_REGEX, tCommon('validations.firstName.invalid')),

    lastName: z
      .string({ required_error: tCommon('validations.lastName.required') })
      .min(1, { message: tCommon('validations.lastName.required') })
      .min(2, tCommon('validations.lastName.min', { min: 2 }))
      .max(50, tCommon('validations.lastName.max', { max: 50 }))
      .regex(NAME_REGEX, tCommon('validations.lastName.invalid')),
    email: z
      .string({ required_error: tCommon('validations.email.required') })
      .min(1, { message: tCommon('validations.email.required') })
      .email({ message: tCommon('validations.email.invalid') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const { mutateAsync } = useMutation<
    SendOtpPreregisterResponse,
    Error,
    SignupFormData
  >({
    mutationFn: sendOtpPreregister,
    onMutate: () => {
      setServerError(undefined);
    },
  });

  const onFormSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values, {
      onSuccess: (data) => {
        setIsOtpSent(true);
        setUserData({
          ...values,
          registrationKey: data.result.registrationKey,
        });
      },
      onError: (error: Error) => {
        setServerError(error.message);
      },
    });
  });

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={onFormSubmit}
      >
        <AuthFormLayout
          title={t('title')}
          description={t('description')}
          submitBtnLabel={tCommon('buttons.continue')}
          serverError={serverError}
        >
          <CustomInput
            required
            fieldName='firstName'
            label={tCommon('labels.firstName')}
            placeholder={tCommon('placeholders.firstName')}
          />
          <CustomInput
            required
            fieldName='lastName'
            label={tCommon('labels.lastName')}
            placeholder={tCommon('placeholders.lastName')}
          />
          <CustomInput
            required
            fieldName='email'
            label={tCommon('labels.email')}
            placeholder={tCommon('placeholders.email')}
            type='email'
            onKeyDown={preventSpaces}
          />
        </AuthFormLayout>
      </form>
    </Form>
  );
}
