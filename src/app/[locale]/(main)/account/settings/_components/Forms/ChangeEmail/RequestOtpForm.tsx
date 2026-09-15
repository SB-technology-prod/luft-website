import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { useMutation } from '@tanstack/react-query';

import CustomInput from '@/components/shared/form/CustomInput';
import { Form } from '@/components/ui/form';

import FieldFormLayout from '../FieldFormLayout';

import { SetState } from '@/types';
import { IDENTIFIER_TYPE, OTP_PURPOSE, SendOtpData } from '@/types/settings';

import { preventSpaces } from '@/utils';

import { sendOtp } from '@/api/settings';
import { zodResolver } from '@hookform/resolvers/zod';

export default function RequestOtpForm({
  setIdentifier,
  setIsOtpSent,
}: {
  setIdentifier: SetState<string>;
  setIsOtpSent: SetState<boolean>;
}) {
  const [serverError, setServerError] = useState<string | undefined>();
  const tCommon = useTranslations('common');
  const tToaster = useTranslations('toaster');

  const formSchema = z.object({
    email: z
      .string({
        required_error: tCommon('validations.email.required'),
        message: tCommon('validations.email.required'),
      })
      .min(1, { message: tCommon('validations.email.required') })
      .email({ message: tCommon('validations.email.invalid') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
    reValidateMode: 'onChange',
    mode: 'onTouched',
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (values: SendOtpData) => sendOtp(values),
    onMutate: () => {
      setServerError(undefined);
    },
    onSuccess: () => {
      setIsOtpSent(true);
      setIdentifier(form.getValues('email'));
    },
    onError: (error: Error) => {
      const status = error.cause as number;
      if (status === 429) {
        setIsOtpSent(true);
        setIdentifier(form.getValues('email'));
        toast.info(tToaster('otpAlreadySent'), {
          position: 'top-left',
          closeButton: false,
        });
        return;
      }
      setServerError(error.message);
    },
  });

  const onFormSubmit = form.handleSubmit(async ({ email }) => {
    await mutateAsync({
      identifier: email,
      type: IDENTIFIER_TYPE.Email,
      otpPurpose: OTP_PURPOSE.UpdateEmail,
    });
  });

  return (
    <Form {...form}>
      <FieldFormLayout
        submitBtnLabel={tCommon('buttons.next')}
        serverError={serverError}
        onSubmit={onFormSubmit}
      >
        <CustomInput
          required
          fieldName='email'
          label={tCommon('labels.newEmail')}
          type='email'
          placeholder={tCommon('placeholders.email')}
          onKeyDown={preventSpaces}
        />
      </FieldFormLayout>
    </Form>
  );
}
