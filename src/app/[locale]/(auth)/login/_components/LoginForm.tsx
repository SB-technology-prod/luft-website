'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useMutation } from '@tanstack/react-query';

import CustomInput from '@/components/shared/form/CustomInput';
import CustomPasswordInput from '@/components/shared/form/CustomPasswordInput';
import { Form } from '@/components/ui/form';

import AuthFormLayout from '../../_components/AuthFormLayout';
import { loginAction } from '../../actions';

import { preventSpaces } from '@/utils';

import { useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | undefined>();
  const router = useRouter();
  const tCommon = useTranslations('common');
  const t = useTranslations('auth.login');

  const formSchema = z.object({
    email: z
      .string({ required_error: tCommon('validations.email.required') })
      .min(1, { message: tCommon('validations.email.required') })
      .email({ message: tCommon('validations.email.invalid') }),
    password: z
      .string({ required_error: tCommon('validations.password.required') })
      .min(1, { message: tCommon('validations.password.required') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync, isSuccess, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const result = await loginAction(values);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onMutate: () => {
      setServerError(undefined);
    },
    onSuccess: () => {
      // Redirect to home
      router.push('/');
    },
    onError: (error: Error) => {
      setServerError(error.message);
    },
  });

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(async (values) => {
          await mutateAsync(values);
        })}
      >
        <AuthFormLayout
          title={t('title')}
          description={t('description')}
          submitBtnLabel={t('buttonLabel')}
          serverError={serverError}
          isFormRedirecting={isSuccess}
        >
          <CustomInput
            required
            fieldName='email'
            label={tCommon('labels.email')}
            type='email'
            placeholder={tCommon('placeholders.email')}
            disabled={isSuccess}
            onKeyDown={preventSpaces}
          />

          <div className='flex flex-col gap-3.5'>
            <CustomPasswordInput
              required
              fieldName='password'
              label={tCommon('labels.password')}
              placeholder={tCommon('placeholders.password')}
              disabled={isSuccess}
              onKeyDown={preventSpaces}
            />
            <Link
              href='forget-password'
              className={cn('self-end font-normal text-grayish-900 underline', {
                'pointer-events-none': isSuccess || isPending,
              })}
            >
              {t('forgetPasswordLink')}
            </Link>
          </div>
        </AuthFormLayout>
      </form>
    </Form>
  );
}
