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
  ForgetPasswordFormData,
  SendOTPForgetPasswordResponse,
  ValidateForgetPasswordOTPFormData,
  ValidateForgetPasswordOTPResponse,
} from '@/types/auth';

import { sendOtpForgetPassword, validateForgetPasswordOtp } from '@/api/auth';
import { zodResolver } from '@hookform/resolvers/zod';

type VerifyForgetPasswordOTPFormProps = {
  setValidationKey: Dispatch<SetStateAction<string | undefined>>;
  userEmail: string;
};

export default function VerifyForgetPasswordOTPForm({
  setValidationKey,
  userEmail,
}: VerifyForgetPasswordOTPFormProps) {
  const [serverError, setServerError] = useState<string | undefined>();

  const tCommon = useTranslations('common');
  const t = useTranslations('');

  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const numOfDigits = process.env.NEXT_PUBLIC_NUM_OF_OTP_DIGITS ?? 6;

  const formSchema = z.object({
    otp: z
      .string({ required_error: tCommon('validations.otp.required') })
      .min(1, tCommon('validations.otp.required'))
      .min(+numOfDigits, { message: tCommon('validations.otp.invalidLength') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  const { mutateAsync } = useMutation<
    ValidateForgetPasswordOTPResponse,
    Error,
    ValidateForgetPasswordOTPFormData
  >({
    mutationFn: validateForgetPasswordOtp,
    onMutate: () => {
      setServerError(undefined);
    },

    onSuccess: (data) => {
      setValidationKey(data.result.validationKey);
    },
    onError: (error: Error) => setServerError(error.message),
  });

  const { mutate: ResendOTPMutate, isPending: isResendingOtp } = useMutation<
    SendOTPForgetPasswordResponse,
    Error,
    ForgetPasswordFormData
  >({
    mutationFn: () => sendOtpForgetPassword(userEmail),
    onSuccess: () => {
      setIsResendDisabled(true);
      toast.success(tCommon('toaster.emailOtpSent'));
    },
    onError: () => toast.error(tCommon('toaster.failedToSendOtp')),
  });

  const onFormSubmit = form.handleSubmit(async ({ otp }) => {
    await mutateAsync({ email: userEmail, otp });
  });

  const onResendOtp = () => {
    if (userEmail)
      ResendOTPMutate({
        email: userEmail,
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={onFormSubmit}>
        <AuthFormLayout
          title={t('auth.verifyOTP.title')}
          description={t('auth.verifyOTP.description', {
            numOfDigits,
            userEmail,
          })}
          submitBtnLabel={t('auth.forgetPassword.verifyOTP')}
          serverError={serverError}
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
        </AuthFormLayout>
      </form>
    </Form>
  );
}
