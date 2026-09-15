'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useMutation } from '@tanstack/react-query';

import CustomOtpInput from '@/components/shared/form/CustomOtpInput';
import { Form } from '@/components/ui/form';

import AuthFormLayout from '../../_components/AuthFormLayout';
import ResendOTP from '../../_components/ResendOTP';

import {
  SignupFormData,
  UserSignupData,
  VerifyOtpPreregisterFormData,
  VerifyOtpPreregisterResponse,
} from '@/types/auth';

import { resendOtpPreregister, verifyOtpPreregister } from '@/api/auth';
import { zodResolver } from '@hookform/resolvers/zod';

type VerifyOTPFormProps = {
  setIsOtpVerified: Dispatch<SetStateAction<boolean>>;
  userData: UserSignupData;
};

export default function VerifySignupOTPForm({
  setIsOtpVerified,
  userData,
}: VerifyOTPFormProps) {
  const [serverError, setServerError] = useState<string | undefined>();

  const tCommon = useTranslations('common');
  const t = useTranslations('auth.verifyOTP');

  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const { email: userEmail, registrationKey } = userData;
  const numOfDigits = process.env.NEXT_PUBLIC_NUM_OF_OTP_DIGITS ?? 6;

  const formSchema = z.object({
    code: z
      .string()
      .min(1, { message: tCommon('validations.otp.required') })
      .refine(
        (otp) => otp.length === +numOfDigits,
        tCommon('validations.otp.invalidLength'),
      ),
    identifier: z
      .string({ required_error: tCommon('validations.firstName.required') })
      .min(1, { message: tCommon('validations.firstName.required') }),
    type: z.number(),
    purpose: z.number(),
    registrationKey: z.string().min(1, 'required'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      identifier: userEmail,
      type: 1,
      purpose: 1,
      registrationKey,
    },
  });

  const { mutateAsync } = useMutation<
    VerifyOtpPreregisterResponse,
    Error,
    VerifyOtpPreregisterFormData
  >({
    mutationFn: verifyOtpPreregister,
    onMutate: () => {
      setServerError(undefined);
    },

    onSuccess: () => {
      setIsOtpVerified(true);
    },
    onError: (error: Error) => setServerError(error.message),
  });

  const { mutate: ResendOTPMutate, isPending: isResendingOtp } = useMutation<
    VerifyOtpPreregisterResponse,
    Error,
    SignupFormData
  >({
    mutationFn: resendOtpPreregister,
    onSuccess: () => {
      setIsResendDisabled(true);
      toast.success(tCommon('toaster.emailOtpSent'));
    },
    onError: () => toast.error(tCommon('toaster.failedToSendOtp')),
  });

  const onFormSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values);
  });

  const onResendOtp = () => {
    if (userData.email) ResendOTPMutate(userData);
  };

  return (
    <Form {...form}>
      <form onSubmit={onFormSubmit}>
        <AuthFormLayout
          title={t('title')}
          description={t('description', { numOfDigits, userEmail })}
          submitBtnLabel={tCommon('buttons.continue')}
          serverError={serverError}
        >
          <div className='flex flex-col items-center gap-4'>
            <CustomOtpInput
              numOfDigits={+numOfDigits}
              fieldName='code'
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
        </AuthFormLayout>
      </form>
    </Form>
  );
}
