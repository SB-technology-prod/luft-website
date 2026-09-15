'use client';

import { useContext, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useMutation } from '@tanstack/react-query';

import CustomPasswordInput from '@/components/shared/form/CustomPasswordInput';
import { Form } from '@/components/ui/form';

import FieldFormLayout from './FieldFormLayout';

import { EditableFieldContext } from '@/contexts/EditableFieldContext';

import { ChangePasswordFormData } from '@/types/settings';

import { preventSpaces } from '@/utils';

import { PASSWORD_REGEX } from '@/constants/regex';

import { changeUserPassword } from '@/api/settings';
import { signOut } from '@/app/[locale]/(auth)/actions';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ChangePasswordForm() {
  const [serverError, setServerError] = useState<string | undefined>();

  const tCommon = useTranslations('common');

  const formSchema = z
    .object({
      currentPassword: z
        .string({
          message: tCommon('validations.required'),
          required_error: tCommon('validations.required'),
        })
        .min(1, tCommon('validations.required')),

      password: z
        .string({
          message: tCommon('validations.required'),
          required_error: tCommon('validations.required'),
        })
        .min(1, tCommon('validations.required'))
        .superRefine((password, ctx) => {
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

      confirmPassword: z
        .string({
          message: tCommon('validations.required'),
          required_error: tCommon('validations.required'),
        })
        .min(1, tCommon('validations.confirmPassword.required')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tCommon('validations.confirmPassword.mismatch'),
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    reValidateMode: 'onChange',
    mode: 'onTouched',
  });

  const { setIsOpen } = useContext(EditableFieldContext);

  const { mutateAsync } = useMutation({
    mutationFn: async (values: ChangePasswordFormData) =>
      changeUserPassword(values),
    onMutate: () => {
      setServerError(undefined);
    },

    onSuccess: async () => {
      setIsOpen(false);
      toast.success(tCommon('toaster.dataUpdatedSuccess'));
      await signOut();
    },
    onError: (error: Error) => setServerError(error.message),
  });

  const onFormSubmit = form.handleSubmit(async (values) => {
    await mutateAsync({
      currentPassword: values.currentPassword,
      newPassword: values.password,
    });
  });

  return (
    <Form {...form}>
      <FieldFormLayout
        submitBtnLabel={tCommon('buttons.change')}
        serverError={serverError}
        onSubmit={onFormSubmit}
      >
        <CustomPasswordInput
          required
          fieldName='currentPassword'
          label={tCommon('labels.currentPassword')}
          placeholder={tCommon('placeholders.password')}
          onKeyDown={preventSpaces}
        />
        <CustomPasswordInput
          required
          fieldName='password'
          label={tCommon('labels.newPassword')}
          placeholder={tCommon('placeholders.newPassword')}
          onKeyDown={preventSpaces}
        />
        <CustomPasswordInput
          required
          fieldName='confirmPassword'
          label={tCommon('labels.confirmPassword')}
          placeholder={tCommon('placeholders.confirmPassword')}
          onKeyDown={preventSpaces}
        />
      </FieldFormLayout>
    </Form>
  );
}
