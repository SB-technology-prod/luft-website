'use client';

import { useContext, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import CustomOtpInput from '@/components/shared/form/CustomOtpInput';
import { Form } from '@/components/ui/form';

import FieldFormLayout from './FieldFormLayout';
import { profileFormQueryKey } from './schemas';

import { EditableFieldContext } from '@/contexts/EditableFieldContext';

import {
  ChangeUserIdentifierData,
  IDENTIFIER_TYPE,
  OTP_PURPOSE,
} from '@/types/settings';

import { changeUserIdentifier, resendOtp } from '@/api/settings';
import ResendOTP from '@/app/[locale]/(auth)/_components/ResendOTP';
import { signOut } from '@/app/[locale]/(auth)/actions';
import { zodResolver } from '@hookform/resolvers/zod';

type VerifyOTPFormProps = {
  identifier: string;
  identifierType: IDENTIFIER_TYPE;
  otpPurpose: OTP_PURPOSE;
};

export default function VerifyOTPForm({
  identifier,
  identifierType,
  otpPurpose,
}: VerifyOTPFormProps) {
  const isPhoneIdentifier = identifierType === IDENTIFIER_TYPE.Phone;
  const [serverError, setServerError] = useState<string | undefined>();

  const tCommon = useTranslations('common');
  const tSettings = useTranslations('settings');

  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const numOfDigits = process.env.NEXT_PUBLIC_NUM_OF_OTP_DIGITS ?? 6;

  const formSchema = z.object({
    otp: z
      .string()
      .min(1, { message: tCommon('validations.otp.required') })
      .refine(
        (otp) => otp.length === +numOfDigits,
        tCommon('validations.otp.invalidLength'),
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  const { setIsOpen } = useContext(EditableFieldContext);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (values: ChangeUserIdentifierData) =>
      changeUserIdentifier(values),
    onMutate: () => {
      setServerError(undefined);
    },

    onSuccess: async () => {
      setIsOpen(false);
      toast.success(tCommon('toaster.dataUpdatedSuccess'));
      if (identifierType === IDENTIFIER_TYPE.Email) {
        await signOut();
      } else queryClient.invalidateQueries({ queryKey: [profileFormQueryKey] });
    },
    onError: (error: Error) => setServerError(error.message),
  });

  const { mutate: ResendOTPMutate, isPending: isResendingOtp } = useMutation({
    mutationFn: async () =>
      resendOtp({
        identifier,
        type: identifierType,
        otpPurpose,
      }),
    onSuccess: () => {
      setIsResendDisabled(true);
      toast.success(
        tCommon(
          isPhoneIdentifier ? 'toaster.phoneOtpSent' : 'toaster.emailOtpSent',
        ),
      );
    },
    onError: () => toast.error(tCommon('toaster.failedToSendOtp')),
  });

  const onFormSubmit = form.handleSubmit(async ({ otp }) => {
    await mutateAsync({
      newIdentifier: identifier,
      type: identifierType,
      otpCode: otp,
    });
  });

  const onResendOtp = () => {
    ResendOTPMutate();
  };

  return (
    <Form {...form}>
      <FieldFormLayout
        title={tSettings('titles.newEmailOtpSent')}
        description={tSettings('descriptions.otpSent', {
          numOfDigits,
          identifier,
        })}
        submitBtnLabel={tCommon('buttons.change')}
        serverError={serverError}
        className='gap-8'
        onSubmit={onFormSubmit}
      >
        <div className='flex flex-col items-center gap-4'>
          <CustomOtpInput
            numOfDigits={+numOfDigits}
            fieldName='otp'
          />
          <ResendOTP
            {...{
              isResendDisabled,
              setIsResendDisabled,
              onResend: onResendOtp,
              isResending: isResendingOtp,
            }}
          />
        </div>
      </FieldFormLayout>
    </Form>
  );
}
