import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import z from 'zod';

import { useMutation } from '@tanstack/react-query';

import CustomPasswordInput from '@/components/shared/form/CustomPasswordInput';
import { Form } from '@/components/ui/form';

import FieldFormLayout from './FieldFormLayout';

import { preventSpaces } from '@/utils';

import { verifyUserPassword } from '@/api/settings';
import { zodResolver } from '@hookform/resolvers/zod';

export default function VerifyUserPassword({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [serverError, setServerError] = useState<string | undefined>();
  const tCommon = useTranslations('common');
  const tSettings = useTranslations('settings');

  const formSchema = z.object({
    currentPassword: z
      .string({
        required_error: tCommon('validations.password.required'),
        message: tCommon('validations.password.required'),
      })
      .min(1, { message: tCommon('validations.password.required') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
    },
    reValidateMode: 'onChange',
    mode: 'onTouched',
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (password: string) => verifyUserPassword(password),
    onMutate: () => {
      setServerError(undefined);
    },
    onSuccess,
    onError: (error: Error) => {
      setServerError(error.message);
    },
  });

  const onFormSubmit = form.handleSubmit(async ({ currentPassword }) => {
    await mutateAsync(currentPassword);
  });

  return (
    <Form {...form}>
      <FieldFormLayout
        submitBtnLabel={tCommon('buttons.next')}
        serverError={serverError}
        onSubmit={onFormSubmit}
      >
        <div className='flex flex-col gap-4 md:gap-6 lg:gap-8'>
          <h5 className='ms-4 text-lg font-medium text-grayish-900 md:text-xl lg:text-2xl'>
            {tSettings('titles.verifyPassword')}
          </h5>
          <CustomPasswordInput
            required
            fieldName='currentPassword'
            label={tCommon('labels.password')}
            placeholder={tCommon('placeholders.password')}
            onKeyDown={preventSpaces}
          />
        </div>
      </FieldFormLayout>
    </Form>
  );
}
