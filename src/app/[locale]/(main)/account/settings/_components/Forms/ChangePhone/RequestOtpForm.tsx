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

import { EGYPTIAN_PHONE } from '@/constants/regex';

import { sendOtp } from '@/api/settings';
import { handleOnlyNumbersKeyDown } from '@/lib/utils';
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
    phone: z
      .string({
        required_error: tCommon('validations.required'),
        message: tCommon('validations.required'),
      })
      .min(1, { message: tCommon('validations.required') })
      .regex(EGYPTIAN_PHONE, tCommon('validations.phone.invalid')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
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
      setIdentifier(form.getValues('phone'));
    },
    onError: (error: Error) => {
      const status = error.cause as number;
      if (status === 429) {
        setIsOtpSent(true);
        setIdentifier(form.getValues('phone'));
        toast.info(tToaster('otpAlreadySent'), {
          position: 'top-left',
          closeButton: false,
        });
        return;
      }

      setServerError(error.message);
    },
  });

  const onFormSubmit = form.handleSubmit(async ({ phone }) => {
    await mutateAsync({
      identifier: phone,
      type: IDENTIFIER_TYPE.Phone,
      otpPurpose: OTP_PURPOSE.UpdatePhone,
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
          fieldName='phone'
          label={tCommon('labels.newPhone')}
          placeholder={'EX. 010XXXXXXXX'}
          onKeyDown={handleOnlyNumbersKeyDown}
        />
      </FieldFormLayout>
    </Form>
  );
}
