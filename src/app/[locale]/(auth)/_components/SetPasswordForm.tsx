'use client';

import { ComponentProps, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useMutation } from '@tanstack/react-query';

import CustomPasswordInput from '@/components/shared/form/CustomPasswordInput';
import { Form } from '@/components/ui/form';

import AuthFormLayout from './AuthFormLayout';

import { preventSpaces } from '@/utils';

import { PASSWORD_REGEX } from '@/constants/regex';

import { zodResolver } from '@hookform/resolvers/zod';

type SetPasswordFormProps = Omit<
  ComponentProps<typeof AuthFormLayout>,
  'children'
> & {
  onSubmit: (values: {
    password: string;
    confirm_password: string;
  }) => Promise<unknown>;
  onSubmissionSuccess?: (data: unknown) => void;
};

export default function SetPasswordForm({
  title,
  description,
  submitBtnLabel,
  onSubmit,
  onSubmissionSuccess,
}: SetPasswordFormProps) {
  const [serverError, setServerError] = useState<string | undefined>();

  const tCommon = useTranslations('common');

  const formSchema = z
    .object({
      password: z.string().superRefine((password, ctx) => {
        if (password.length < 8 || password.length > 20) {
          ctx.addIssue({
            code: 'custom',
            message: tCommon('validations.password.length'),
          });
        }

        if (!PASSWORD_REGEX.number.test(password)) {
          ctx.addIssue({
            code: 'custom',
            message: tCommon('validations.password.number'),
          });
        }

        if (!PASSWORD_REGEX.special.test(password)) {
          ctx.addIssue({
            code: 'custom',
            message: tCommon('validations.password.specialCharacter'),
          });
        }

        if (!PASSWORD_REGEX.uppercase.test(password)) {
          ctx.addIssue({
            code: 'custom',
            message: tCommon('validations.password.uppercase'),
          });
        }

        if (!PASSWORD_REGEX.lowercase.test(password)) {
          ctx.addIssue({
            code: 'custom',
            message: tCommon('validations.password.lowercase'),
          });
        }
      }),
      confirm_password: z
        .string()
        .min(1, tCommon('validations.confirmPassword.required')),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: tCommon('validations.confirmPassword.mismatch'),
      path: ['confirm_password'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
    criteriaMode: 'all',
  });

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: onSubmit,
    onMutate: () => {
      setServerError(undefined);
    },

    onSuccess: (result: any) => {
      if (result?.success === false) {
        setServerError(result.error);
      } else if (onSubmissionSuccess) {
        onSubmissionSuccess(result);
      }
    },
    onError: (error: Error) => setServerError(error.message),
  });

  const onFormSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values);
  });

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={onFormSubmit}
      >
        <AuthFormLayout
          {...{
            title,
            description,
            submitBtnLabel,
            serverError,
            isFormRedirecting: isSuccess,
          }}
        >
          <CustomPasswordInput
            required
            fieldName='password'
            label={tCommon('labels.newPassword')}
            placeholder={tCommon('placeholders.newPassword')}
            onKeyDown={preventSpaces}
          />
          <CustomPasswordInput
            required
            fieldName='confirm_password'
            label={tCommon('labels.confirmPassword')}
            placeholder={tCommon('placeholders.confirmPassword')}
            onKeyDown={preventSpaces}
          />
        </AuthFormLayout>
      </form>
    </Form>
  );
}
